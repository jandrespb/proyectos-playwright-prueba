```md
# 🧪 Pokemon Evolution API - Playwright TypeScript

Proyecto de automatización E2E / API Testing usando Playwright + TypeScript.

El objetivo es consumir la API pública de PokéAPI, obtener la cadena evolutiva de un Pokémon (por defecto Squirtle), extraer información relevante y procesarla.

---

## 📌 Objetivo de la prueba

- Consumir la API de Pokémon
- Obtener la cadena evolutiva de Squirtle
- Extraer nombres de la evolución
- Obtener el peso de cada Pokémon
- Ordenar alfabéticamente SIN usar `.sort()`
- Generar un log JSON con el resultado final

---

## 🧱 Arquitectura del proyecto

```

src/
├── api/
│   └── BaseApi.ts
├── models/
│   ├── Pokemon.ts
│   ├── Species.ts
│   └── Evolution.ts
├── services/
│   └── PokemonEvolutionService.ts
├── utils/
│   └── ToolsUtils.ts
├── logs/
│   └── evolutions.json
└── tests/
└── pokemon-evolution.spec.ts

````

---

## 🚀 Instalación

```bash
npm install
````

---

## ▶️ Ejecución de pruebas

```bash
npx playwright test
```

---

## 📊 Resultado

El test:

* Consume la API de Pokémon
* Obtiene la evolución de Squirtle
* Extrae nombres y pesos
* Ordena alfabéticamente sin `.sort()`
* Genera un archivo JSON en `src/logs/evolutions.json`

---

## 🧠 Pokémon por defecto

Si no se envía parámetro, el sistema usa:

```
squirtle
```

---

## 📁 Logs

Se genera automáticamente:

```
src/logs/evolutions.json
```

Contiene el resultado final procesado.

---

## 🛠 Tecnologías

* Playwright
* TypeScript
* Node.js
* PokéAPI

---

## ✍️ Notas

* El ordenamiento se realiza manualmente (sin `.sort()`).
* La arquitectura separa API, servicios, modelos y utilidades.
* El flujo está diseñado para ser extensible a otros Pokémon.

