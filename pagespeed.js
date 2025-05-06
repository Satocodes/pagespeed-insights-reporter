require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const API_KEY = process.env.PAGESPEED_API_KEY;
const urls = JSON.parse(fs.readFileSync('./urls.json', 'utf-8'));

const csvWriter = createObjectCsvWriter({
  path: 'results-pagespeed.csv',
  header: [
    { id: 'url', title: 'URL' },
    { id: 'desktop', title: 'Performance Desktop' },
    { id: 'mobile', title: 'Performance Mobile' },
    { id: 'actions', title: 'Acciones sugeridas' }
  ]
});

async function getPerformanceAndActions(url, strategy) {
  try {
    const { data } = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
      params: {
        url,
        key: API_KEY,
        strategy
      }
    });

    const score = data?.lighthouseResult?.categories?.performance?.score;
    const audits = data?.lighthouseResult?.audits;

    let actions = [];
    if (audits) {
      actions = Object.values(audits)
        .filter(a => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'numeric')
        .map(a => a.title.replace(/,/g, ''))
        .slice(0, 10); // Máximo 10 sugerencias
    }

    return {
      score: score !== undefined ? Math.round(score * 100) : 'N/A',
      actions: actions
    };

  } catch (error) {
    console.error(`❌ Error con ${url} (${strategy}):`, error.message);
    return { score: 'Error', actions: [] };
  }
}

(async () => {
  const results = [];

  for (const url of urls) {
    const desktop = await getPerformanceAndActions(url, 'desktop');
    const mobile = await getPerformanceAndActions(url, 'mobile');

    results.push({
      url,
      desktop: desktop.score,
      mobile: mobile.score,
      actions: [...new Set([...desktop.actions, ...mobile.actions])].join(' | ') || 'N/A'
    });

    console.log(`✅ ${url} | D: ${desktop.score} | M: ${mobile.score}`);
  }

  await csvWriter.writeRecords(results);
  console.log('\n✅ Resultados guardados en results-pagespeed.csv');
})();
