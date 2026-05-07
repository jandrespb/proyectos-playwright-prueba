# Propuesta de Arquitectura del Framework de QA

## 1. Arquitectura del Framework

El framework está dividido en dos proyectos independientes con responsabilidades claras:

### 1.1 Pruebas E2E — `e2e-saucelabs`

Se implementó el patrón **Page Object Model (POM)** donde cada pantalla de la aplicación tiene su propia clase con responsabilidad única. Las decisiones clave fueron:

- **Pages** → cada clase representa una pantalla (LoginPage, ProductsPage, CartPage, CheckoutPage) y expone únicamente métodos de acción, sin lógica de validación
- **Locators** → separados de los pages en archivos independientes, lo que permite actualizar selectores sin tocar la lógica de negocio
- **Models** → interfaces TypeScript (`LoginModel`, `ProductModel`) que tipan los datos que fluyen entre capas
- **World** → objeto compartido de Cucumber que mantiene el estado del escenario (página activa, producto seleccionado)
- **Hooks** → manejo del ciclo de vida del navegador y captura de screenshots por step
- **Logs** → registro en JSON del número de orden generado al finalizar la compra

Tecnologías: `Playwright`, `Cucumber`, `TypeScript`, `Allure`

### 1.2 Pruebas de Integración API — `api-pokeapi`

Se implementó una arquitectura orientada a servicios:

- **BaseApi** → capa base para las peticiones HTTP con `@playwright/test request`
- **Services** → lógica de negocio para obtener y procesar la cadena de evoluciones
- **Models** → interfaces que tipan las respuestas de la API (Pokemon, Species, Evolution)
- **Utils** → utilidades reutilizables como el algoritmo de ordenamiento alfabético sin métodos nativos
- **Logs** → resultado de las evoluciones guardado en JSON

Tecnologías: `Playwright`, `TypeScript`

---

## 2. Pipeline CI/CD

Se implementaron dos pipelines en **GitHub Actions** con responsabilidades separadas:

### `ci.yml` — Integración Continua
Valida que el proyecto compile correctamente, las dependencias se instalen y las variables de entorno estén configuradas. Se ejecuta en cada push y pull request a las ramas `main` e `impl-ci-cd`.

### `quality-gate.yml` — Quality Gate
Ejecuta **Biome** para validar reglas de linting y formato de código. Si el código no cumple las reglas mínimas de calidad, el pipeline falla y bloquea la integración del cambio. Esto garantiza un estándar de código consistente en el equipo.

Ambos pipelines corren en `ubuntu-latest` con Node 20.

---

## 3. Reportes

- **Allure Report** → reporte interactivo con historial de ejecuciones, screenshots adjuntos por cada step del escenario y detalle de pasos pasados y fallidos
- **Screenshots automáticos** → capturados después de cada step mediante `AfterStep` hook, visibles directamente en el reporte
- **JSON de orden** → registro de la orden de compra generada al finalizar el flujo E2E
- **JSON de evoluciones** → resultado del procesamiento de la cadena evolutiva del Pokémon

---

## 4. Quality Gates

Se definieron dos niveles de quality gate:

- **Nivel código** → Biome verifica linting y formato antes de integrar cualquier cambio. Un PR con errores de calidad no puede mergearse
- **Nivel pipeline** → si algún step del CI falla, el pipeline reporta el error con un mensaje descriptivo que facilita la identificación del problema

---

## 5. Estrategia de Mantenimiento

La arquitectura facilita el mantenimiento de varias formas:

- **Localizadores separados** → cuando la UI cambia, solo se actualiza el archivo de locators sin tocar pages ni steps
- **Modelos tipados** → TypeScript detecta en tiempo de compilación si un cambio rompe el contrato de datos
- **Pipeline de CI** → cada cambio en el repositorio pasa por validación automática, lo que reduce la posibilidad de introducir regresiones
- **Biome** → mantiene el código limpio y consistente sin depender de revisiones manuales de estilo

---

## 6. Escalabilidad

Para escalar la solución a un equipo de QA más grande se propone:

- **Ejecución en paralelo** → Cucumber y Playwright soportan ejecución paralela de escenarios, reduciendo el tiempo total de ejecución
- **Múltiples browsers** → Playwright soporta Chromium, Firefox y WebKit de forma nativa, ampliando la cobertura de compatibilidad
- **Nuevos módulos independientes** → la arquitectura basada en Node.js permite agregar nuevas funcionalidades o integraciones sin afectar los módulos existentes
- **Integración con gestores de pruebas** → Allure puede integrarse con herramientas como Xray o TestRail para gestionar casos de prueba a nivel de equipo
- **Variables de entorno por ambiente** → el uso de `.env` permite configurar diferentes ambientes (dev, staging, producción) sin cambiar el código

---
