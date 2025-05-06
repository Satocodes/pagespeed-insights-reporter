# PageSpeed Insights Reporter

Herramienta en Node.js para ejecutar auditorías automáticas de PageSpeed Insights sobre múltiples URLs y generar un archivo CSV con resultados clave: rendimiento móvil, escritorio y sugerencias de mejora.

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/pagespeed-insights-reporter.git
cd pagespeed-insights-reporter
npm install
```

🔐 Configuración

Crea un archivo .env con tu API Key de PageSpeed:
```bash
PAGESPEED_API_KEY=TU_API_KEY
```

Este repositorio ya incluye el archivo .env para facilitar el uso online (solo cambiar tu clave).
## 🌐 Cargar URLs

Edita el archivo urls.json y coloca tus URLs:
```
[
  "https://www.tusitio.com/",
  "https://www.tusitio.com/contacto"
]
```

## ▶️ Ejecutar el Script

node pagespeed.js

Esto generará un archivo results-pagespeed.csv con las columnas:
```
    URL

    Performance Mobile

    Performance Desktop

    Acciones sugeridas (top 10)
```

## 💻 Frontend Web (Próximamente)

Permitirá:

    Cargar URLs individuales o múltiples desde archivo .txt (separadas por ENTER)

    Mostrar resultados tabulados

    Copiar resultados o exportarlos

## 📄 Ejemplo de Resultado CSV

URL,Performance_Mobile,Performance_Desktop,Acciones_sugeridas
https://www.ejemplo.com,45,75,"Eliminar recursos de bloqueo de renderizado | Reducir tiempo de respuesta del servidor"

🧪 Requisitos

    Node.js >= 18

    Acceso a API de Google PageSpeed