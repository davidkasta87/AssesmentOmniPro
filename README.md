# 🚀 OmniPro Assessment - Advanced Playwright Test Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-Tests-brightgreen.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![Page Object Model](https://img.shields.io/badge/Pattern-Page%20Object%20Model-orange.svg)](#page-object-model)

A comprehensive automated test suite built with **Playwright** and **TypeScript** for the [DemoQA website](https://demoqa.com/). This framework implements advanced testing patterns, enhanced reporting, and comprehensive evidence capture for professional test automation.

## 🎯 Key Features

- **🏗️ Page Object Model (POM)** - Maintainable and scalable test architecture
- **📸 Enhanced Evidence Capture** - Screenshots, videos, traces on failures
- **📊 Step-by-Step Reporting** - Visual progression through test execution
- **🔍 Performance Monitoring** - Load times, paint metrics, network analysis
- **🎯 Test Categorization** - Feature tags, severity levels, metadata
- **🌐 Cross-browser Testing** - Chromium, Firefox, WebKit support
- **📱 Responsive Design Testing** - Mobile and desktop viewports
- **🔧 TypeScript Support** - Type safety and intellisense

## 📁 Project Structure

```
📦 OmniProAssessment/
├── 📂 page-objects/           # Page Object Model implementation
│   ├── base.page.ts          # Base page with common functionality
│   ├── home.page.ts          # Homepage interactions
│   ├── elements.page.ts      # Elements section navigation
│   ├── textbox.page.ts       # Text box form handling
│   ├── forms.page.ts         # Forms section navigation
│   ├── practiceform.page.ts  # Complex form workflows
│   └── index.ts              # Centralized exports
├── 📂 tests/                 # Test specifications
│   ├── caso-1-navegar-a-la-pagina-principal.spec.ts
│   ├── caso-2-section-elements-text-box.spec.ts
│   ├── caso-3-section-forms-practice-form.spec.ts
│   ├── caso-4-section-alerts-frame-windows.spec.ts
│   ├── caso-5-section-widgets-accordion.spec.ts
│   ├── caso-6-section-interactions-drag-and-drop.spec.ts
│   ├── caso-7-book-store-application-busqueda-de-libros.spec.ts
│   ├── enhanced-reporting-example.spec.ts
│   └── seed.spec.ts
├── 📂 fixtures/              # Test fixtures and setup
│   ├── page-fixtures.ts      # Page object fixtures
│   └── test-hooks.ts         # Enhanced test hooks
├── 📂 test-data/             # Centralized test data
│   └── index.ts              # User data and constants
├── 📂 test-setup/            # Global configuration
│   └── global-hooks.ts       # Suite-level hooks
├── 📂 utils/                 # Reporting utilities
│   └── report-utils.ts       # Enhanced reporting functions
├── 📂 specs/                 # Test documentation
│   └── demoqa-test.plan.md   # Test plan documentation
├── 📄 playwright.config.ts   # Playwright configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 package.json           # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+
- **npm** 7+

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd OmniProAssessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

### Running Tests

#### Run All Tests

```bash
npm test                    # Run complete test suite
npx playwright test         # Alternative command
```

#### Run Specific Tests

```bash
# Single test file
npx playwright test tests/caso-1-navegar-a-la-pagina-principal.spec.ts

# Multiple test files
npx playwright test tests/caso-1* tests/caso-2*

# By test name pattern
npx playwright test --grep "Navigation Suite"

# With specific browser
npx playwright test --project=chromium
```

#### Test Execution Options

```bash
# Headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui

# Generate and view report
npx playwright show-report
```

## 📊 Test Reports & Evidence

### HTML Reports

After test execution, comprehensive HTML reports are generated at:

```
playwright-report/index.html
```

### Evidence Captured

- **📸 Screenshots** - On failures and key test steps
- **🎥 Videos** - Complete test execution recordings
- **🔍 Traces** - Time-travel debugging capabilities
- **📄 Page Source** - HTML content at failure points
- **📝 Console Logs** - JavaScript errors and warnings
- **🌐 Network Requests** - API calls and responses
- **⏱️ Performance Metrics** - Load times and paint events
- **💾 Storage State** - LocalStorage and SessionStorage dumps

### Test Metadata

Each test includes rich metadata:

- **Feature categorization** (Elements, Forms, Widgets, etc.)
- **Severity levels** (low, medium, high, critical)
- **Test execution timing** and retry information
- **Browser and environment details**
- **Step-by-step progression** with visual evidence

## 🏗️ Page Object Model Architecture

This framework implements the **Page Object Model (POM)** design pattern for maintainable and scalable test automation:

### Base Page Class

```typescript
// page-objects/base.page.ts
export class BasePage {
  protected page: Page;

  async takeScreenshot(testInfo: any, name: string) {
    /* ... */
  }
  async captureContext(testInfo: any, stepName: string) {
    /* ... */
  }
  async goto(url: string = "/") {
    /* ... */
  }
}
```

### Page-Specific Classes

```typescript
// page-objects/home.page.ts
export class HomePage extends BasePage {
  async navigateToHomePage() {
    /* ... */
  }
  async clickElements() {
    /* ... */
  }
  async verifyAllSectionsVisible() {
    /* ... */
  }
}
```

### Usage in Tests

```typescript
// tests/caso-1-navegar-a-la-pagina-principal.spec.ts
test("Navigation Test", async ({ page }, testInfo) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  await homePage.verifyAllSectionsVisible();
  await homePage.takeScreenshot(testInfo, "final-screenshot");
});
```

## 📋 Test Cases Covered

| Test Case  | Description                               | Status |
| ---------- | ----------------------------------------- | ------ |
| **Caso 1** | Navigate to main page and verify sections | ✅     |
| **Caso 2** | Elements - Text Box form submission       | ✅     |
| **Caso 3** | Forms - Practice form completion          | ✅     |
| **Caso 4** | Alerts & Windows - Modal handling         | ✅     |
| **Caso 5** | Widgets - Accordion interactions          | ✅     |
| **Caso 6** | Interactions - Drag and drop              | ⚠️     |
| **Caso 7** | Book Store - Search functionality         | ✅     |

## 🔧 Configuration

### Environment Variables

```bash
# Set custom base URL
BASE_URL=https://demoqa.com npm test

# Run in CI mode
CI=true npm test
```

### Playwright Configuration

```typescript
// playwright.config.ts highlights
export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || "https://demoqa.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  reporter: [
    ["html", { attachToReport: true }],
    ["json", { outputFile: "results.json" }],
  ],
});
```

## 🧪 Writing New Tests

### 1. Create Page Object (if needed)

```typescript
// page-objects/new-section.page.ts
export class NewSectionPage extends BasePage {
  private readonly newElement = this.page.locator("#new-element");

  async performAction() {
    await this.newElement.click();
  }
}
```

### 2. Add Test Data

```typescript
// test-data/index.ts
export const newTestData = {
  validInput: "test value",
  expectedResult: "expected output",
};
```

### 3. Write Test

```typescript
// tests/new-test.spec.ts
import { test, expect } from "@playwright/test";
import { NewSectionPage } from "../page-objects";

test.describe("New Test Suite", () => {
  test("New Test Case", async ({ page }, testInfo) => {
    const newPage = new NewSectionPage(page);

    await test.step("Step 1: Navigation", async () => {
      await newPage.goto("/new-section");
    });

    await test.step("Step 2: Action", async () => {
      await newPage.performAction();
    });

    await newPage.takeScreenshot(testInfo, "final-evidence");
  });
});
```

## 📈 Advanced Features

### Enhanced Error Handling

- **Automatic failure screenshots**
- **Page source capture** on errors
- **Console error logging**
- **Network request monitoring**

### Performance Monitoring

```typescript
// Captured automatically in reports
{
  "loadTime": 1250,
  "domContentLoaded": 800,
  "firstPaint": 650,
  "firstContentfulPaint": 720
}
```

### Test Evidence

- **Step-by-step screenshots**
- **Interactive HTML reports**
- **Trace files** for debugging
- **JSON export** for analysis

## 🛠️ Development Workflow

### 1. Local Development

```bash
# Run specific test in headed mode
npx playwright test --headed --project=chromium tests/caso-1*

# Debug test with breakpoints
npx playwright test --debug tests/caso-1*

# Interactive UI mode
npx playwright test --ui
```

### 2. Code Quality

```bash
# TypeScript compilation check
npx tsc --noEmit

# Run linter (if configured)
npm run lint
```

### 3. CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Run Playwright tests
  run: npx playwright test

- name: Upload test results
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## 📚 Best Practices Implemented

### ✅ Test Structure

- **Page Object Model** for maintainability
- **TypeScript interfaces** for type safety
- **Centralized test data** management
- **Reusable fixtures** and utilities

### ✅ Reporting & Evidence

- **Rich HTML reports** with attachments
- **Failure screenshots** and videos
- **Step-by-step documentation**
- **Performance metrics** capture

### ✅ Maintenance

- **Single source of truth** for selectors
- **Environment-based configuration**
- **Comprehensive error context**
- **Easy test debugging** capabilities

## 🐛 Troubleshooting

### Common Issues

**Tests failing in CI but passing locally:**

```bash
# Check if headers/viewport differences
npx playwright test --reporter=line
```

**Selectors not found:**

1. Check if page loaded completely
2. Verify element exists in DOM
3. Try more specific selectors

**Performance issues:**

```bash
# Run with traces enabled
npx playwright test --trace=on
```

### Debug Mode

```bash
# Step-through debugging
npx playwright test --debug tests/failing-test.spec.ts

# Headed mode with slowMo
npx playwright test --headed --slowMo=1000
```

## 📊 Reporting Features

### HTML Report Includes:

- **📈 Test execution summary**
- **📸 Screenshot evidence**
- **🎥 Video recordings**
- **🔍 Trace viewer** integration
- **📄 Detailed step logs**
- **⚡ Performance data**
- **🌐 Network activity**

### Accessing Reports:

```bash
# Open latest report
npx playwright show-report

# Serve report on custom port
npx playwright show-report --port 9999
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-test`)
3. **Follow** the Page Object Model pattern
4. **Add** comprehensive test evidence
5. **Update** documentation if needed
6. **Submit** a pull request

### Code Style

- Use **TypeScript** for type safety
- Follow **Page Object Model** patterns
- Add **JSDoc comments** to public methods
- Include **step-by-step evidence** in tests

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🎯 Assessment Evidence

This automation framework demonstrates:

- ✅ **Professional test architecture** with Page Object Model
- ✅ **Comprehensive evidence capture** with screenshots and videos
- ✅ **Advanced reporting capabilities** with step-by-step documentation
- ✅ **Cross-browser compatibility** testing
- ✅ **Performance monitoring** and analysis
- ✅ **Maintainable and scalable** test code structure
- ✅ **Industry best practices** implementation
- ✅ **Complete test coverage** of application functionality

---

**🚀 Ready for professional test automation assessment!**

📊 **View the complete test report**: `playwright-report/index.html`  
📋 **Test documentation**: `specs/demoqa-test.plan.md`  
🔧 **Framework details**: This README and inline code documentation
