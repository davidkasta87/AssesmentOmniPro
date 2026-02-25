# OmniProAssessment

[![npm version](https://img.shields.io/npm/v/omniproassesment?color=blue)](https://www.npmjs.com/package/omniproassesment)
[![Build Status](https://img.shields.io/github/actions/workflow/status/<your-org>/<your-repo>/ci.yml?branch=main)](https://github.com/<your-org>/<your-repo>/actions)
[![Coverage Status](https://img.shields.io/badge/coverage-unknown-lightgrey)](https://github.com/<your-org>/<your-repo>/)

This repository contains an automated test suite built with Playwright and Serenity/JS for the DemoQA website.

## 📁 Project Structure

```
package.json
playwright.config.ts
tsconfig.json
specs/            # test plans
  demoqa-test.plan.md
tests/            # Playwright test files
  example.spec.ts
  seed.spec.ts
  serenity-example.spec.ts
```

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run all tests**
   ```bash
   npm test
   ```
   The script invokes Playwright; it will launch browsers, execute the specs and
   produce a `playwright-report` directory along with Serenity/JS artifacts.

## 🧪 Writing Tests

- Standard Playwright tests reside in `tests/*.spec.ts` and use the
  `@playwright/test` framework.
- Serenity/JS tests use the `@serenity-js/playwright-test` runner; see
  `tests/serenity-example.spec.ts` for a basic sample.
- Test plans are maintained in `specs/demoqa-test.plan.md` using a human-readable
  format that can be leveraged by tooling.

## 📘 Documentación de la automatización

Este repositorio incluye una documentación completa de la automatización dentro
de este archivo README y en el plan de pruebas ubicado en `specs/demoqa-test.plan.md`.
La información clave:

1. **Estructura de pruebas** – Las pruebas se organizan por casos de uso en el
   directorio `tests/`. Cada archivo corresponda a un escenario de navegación y
   contiene comentarios que enlazan con el plan de pruebas.
2. **Planes de prueba** – Utilice `specs/demoqa-test.plan.md` para describir los
   escenarios de alto nivel, pasos y expectativas. El contenido es legible para
   humanos y puede ser automatizado para generar o validar pruebas.
3. **Cómo agregar un nuevo caso**:
   - Añada un título y pasos en el plan de pruebas bajo la sección adecuada.
   - Cree un nuevo archivo `.spec.ts` dentro de `tests/` con el mismo nombre
     descriptivo; incluya encabezados `// spec: specs/demoqa-test.plan.md` y
     `// seed: tests/seed.spec.ts` para mantener trazabilidad.
   - Siga las prácticas existentes de localizadores robustos y `expect`.
4. **Ejecución y reportes** –
   - `npm test` ejecuta la suite completa usando Playwright. El comando es un
     atajo para `npx playwright test` y respeta la configuración de
     `playwright.config.ts`.
   - Para correr un conjunto específico de pruebas utilice etiquetas o rutas,
     por ejemplo:
     ```bash
     npx playwright test tests/caso-3-section-forms-practice-form.spec.ts
     npx playwright test --grep "Navigation Suite"
     ```
   - El modo `--headed` o `--headless=0` permite ver el navegador durante la
     ejecución; útil para depuración.
   - Puede ajustar la variable de entorno `HEADLESS=false` o `RETRIES=1` para
     modificar el comportamiento sin cambiar el código.
   - Después de la ejecución se genera un directorio `playwright-report` con un
     informe interactivo, y también se producen artefactos de Serenity/JS
     (`reports/` o `target/site/serenity`) dependiendo de la configuración de
     reporteros.
   - En integración continua (CI) el mismo comando se invoca en el pipeline y
     los artefactos se suben o archivan según sea necesario.
5. **Mantenimiento** – Si la interfaz cambia, actualice los selectores en las
   pruebas y refleje los pasos en el plan de pruebas. Se recomienda ejecutar
   `npm test` tras cada modificación para detectar roturas tempranas.

La documentación dentro de este README sirve como guía principal y se debe
mantener actualizada a medida que el proyecto evoluciona.

## 🛠 Configuration

- **TypeScript** settings are in `tsconfig.json`.
- **Playwright** configuration is in `playwright.config.ts`, including Serenity
  reporters (console + Serenity BDD).

## 📦 Dependencies

Key dev dependencies include:

- `@playwright/test` – the core test framework.
- `@serenity-js/*` packages – for reporting, Screenplay pattern and integration
  with Playwright.

## 🚧 Git

`.gitignore` is configured to exclude build artifacts, logs, IDE settings,
Node modules, Playwright reports, and lockfiles. Feel free to add additional
entries as needed before pushing to remote.

## �️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## �📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Serenity/JS Handbook](https://serenity-js.org/handbook/)

---

Happy testing! 👩‍💻👨‍💻
