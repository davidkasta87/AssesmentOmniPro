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
