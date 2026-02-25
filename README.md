# OmniProAssessment

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

## 📘 Automation Documentation

This repository includes complete automation documentation in this README and in the test plan located at `specs/demoqa-test.plan.md`. Key information:

1. **Test Structure** – Tests are organized by use case in the `tests/` directory. Each file corresponds to a navigation scenario and contains comments linking to the test plan.
2. **Test Plans** – Use `specs/demoqa-test.plan.md` to describe high-level scenarios, steps, and expectations. The content is human-readable and can be automated to generate or validate tests.
3. **How to add a new case**:
   - Add a title and steps in the test plan under the appropriate section.
   - Create a new `.spec.ts` file in `tests/` with a descriptive name; include headers `// spec: specs/demoqa-test.plan.md` and `// seed: tests/seed.spec.ts` for traceability.
   - Follow existing practices for robust locators and `expect`.
4. **Execution and Reports** –
   - `npm test` runs the full suite using Playwright. The command is a shortcut for `npx playwright test` and respects the configuration in `playwright.config.ts`.
   - To run a specific set of tests, use tags or paths, for example:
     ```bash
     npx playwright test tests/caso-3-section-forms-practice-form.spec.ts
     npx playwright test --grep "Navigation Suite"
     ```
   - The `--headed` or `--headless=0` mode lets you see the browser during execution, useful for debugging.
   - You can adjust the `HEADLESS=false` or `RETRIES=1` environment variables to modify behavior without changing code.
   - After execution, a `playwright-report` directory is generated with an interactive report, and Serenity/JS artifacts (`reports/` or `target/site/serenity`) are produced depending on reporter configuration.
   - In CI, the same command is invoked in the pipeline and artifacts are uploaded or archived as needed.
5. **Maintenance** – If the interface changes, update selectors in the tests and reflect the steps in the test plan. It is recommended to run `npm test` after each modification to detect early breakages.

The documentation in this README serves as the main guide and should be kept up to date as the project evolves.

## 🛠 Configuration

- **TypeScript** settings are in `tsconfig.json`.
- **Playwright** configuration is in `playwright.config.ts`, including Serenity reporters (console + Serenity BDD).

## 📦 Dependencies

Key dev dependencies include:

- `@playwright/test` – the core test framework.
- `@serenity-js/*` packages – for reporting, Screenplay pattern, and integration with Playwright.

## 🚧 Git

`.gitignore` is configured to exclude build artifacts, logs, IDE settings, Node modules, Playwright reports, and lockfiles. Add additional entries as needed before pushing to remote.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Serenity/JS Handbook](https://serenity-js.org/handbook/)

---

Happy testing! 👩‍💻👨‍💻
