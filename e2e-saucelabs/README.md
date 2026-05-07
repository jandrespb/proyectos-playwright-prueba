# E2E Sauce Labs

Proyecto de pruebas E2E con Playwright, Cucumber y Allure.

## Arquitectura

```
e2e-saucelabs/
├── src/
│   ├── main/
│   │   ├── locators/        # Selectores de cada página
│   │   ├── logs/            # Registro de órdenes
│   │   ├── model/           # Interfaces de datos
│   │   ├── pages/           # Page Objects
│   │   └── utils/           # Utilidades
│   └── tests/
│       ├── features/        # Escenarios .feature
│       ├── step-definitions/ # Steps de cada escenario
│       └── support/         # Hooks y World
├── reports/                 # Reportes cucumber
├── .env.example             # Variables de entorno
└── cucumber.js              # Configuración Cucumber
```

## Configuración

Copia el archivo de variables de entorno:
```bash
cp .env.example .env
```

Instala dependencias:
```bash
npm install
npx playwright install
```

## Comandos

Ejecutar pruebas:
```bash
npm test
```

Generar reporte Allure:
```bash
npm run allure:report
```

Abrir reporte Allure:
```bash
npm run allure:open
```