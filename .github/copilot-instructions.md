# Copilot Instructions for GAD E2E Test Framework

## Project Overview

This is a comprehensive end-to-end testing framework for the GAD (GUI API Demo) application using Playwright and TypeScript. The framework tests both UI interactions and API endpoints with a focus on maintainability, readability, and comprehensive test coverage. The project follows established design patterns including Page Object Model (POM), Arrange-Act-Assert (AAA), and composition patterns to ensure scalable and maintainable test automation.

## Folder Structure

- `tests/` - Test files organized by type (api, ui with smoke/integration/end-to-end subdirectories)
- `src/` - Source code for test framework components
  - `src/api/` - API testing utilities and helpers
  - `src/ui/` - UI testing components (pages, components, models, fixtures, views)
- `config/` - Configuration files for environment setup and global test configuration
- `docs/` - Project documentation including coding standards and decision logs
- `tmp/` - Temporary files including session storage for authenticated tests
- `test-results/` - Playwright test execution results
- `playwright-report/` - HTML test reports

## Technology Stack

- **Runtime**: Node.js (>16)
- **Language**: TypeScript with ES2021 target and CommonJS modules
- **Testing Framework**: Playwright ^1.47.2 with @playwright/test
- **Code Quality**: ESLint ^9.11.1 with typescript-eslint ^8.8.0, Prettier 3.3.2
- **Test Data**: @faker-js/faker ^8.4.1 for generating realistic test data
- **Environment Management**: dotenv ^16.4.5 for configuration management
- **Git Hooks**: Husky ^9.1.6 for pre-commit code quality checks
- **Import Management**: @trivago/prettier-plugin-sort-imports ^4.3.0

## Coding Standards and Conventions

### Naming Conventions

- **Models**: Use PascalCase with "Model" suffix (e.g., `UserModel`, `RegisterUserModel`)
- **Locators**: Use camelCase with descriptive names (e.g., `userEmailInput`, `loginButton`)
- **Methods**: Use camelCase following verbNoun format (e.g., `getUserData`, `clickSignInButton`)
- **Test Files**: Use descriptive names with `.spec.ts` extension
- **Page Objects**: Use PascalCase with "Page" suffix (e.g., `ArticlesPage`, `HomePage`)

### Code Formatting

- **Line Length**: Maximum 120 characters (enforced by Prettier)
- **Function Return Types**: Explicit return types required for all functions
- **Console Usage**: Use `console.log` only when necessary (ESLint warning)
- **Access Modifiers**: Avoid explicit public/private modifiers unless necessary

### Test Structure

- **Pattern**: Follow AAA (Arrange-Act-Assert) pattern with clear sections
- **Expected Values**: Extract assertion values to variables before use
- **Test Tags**: Use descriptive tags like `@GAD-R01-03`, `@smoke`, `@logged`
- **Test Messages**: Avoid assertion messages unless necessary for clarity

### Import Management

- Use TypeScript path aliases: `@_src/*`, `@_config/*`, `@_pw-config`
- Import sorting managed by @trivago/prettier-plugin-sort-imports
- Group imports: external dependencies first, then internal imports

## Architecture and Design Patterns

### Page Object Model (POM)

- Each page extends `BasePage` class
- Page methods should return new page objects when navigating to different pages
- Locators should be descriptive and use Playwright's recommended selectors
- Components are separate from pages (e.g., `MainMenuComponent`)

### Test Organization

- **API Tests**: Located in `tests/api/` with `.api.spec.ts` naming
- **UI Tests**: Organized by test type in `tests/ui/` (smoke, integration, end-to-end)
- **Fixtures**: Use merged fixtures from `@_src/ui/fixtures/merge.fixtures`
- **Test Data**: Generate using faker.js for realistic data

### Configuration Management

- Environment variables managed through dotenv with required variable validation
- Separate configs for different environments
- Global setup/teardown handled in `config/global.setup.ts`

## Project-Specific Guidelines

### Test Data Generation

- Use @faker-js/faker for generating realistic test data
- Create factory classes for complex test data objects
- Store reusable test data in `src/ui/test-data/` directory

### Authentication Handling

- Use session storage state for logged-in user tests
- Separate test projects for logged (`@logged` tag) and non-logged users
- Session state stored in `tmp/session.json`

### Error Handling

- Use Playwright's built-in error handling and retries
- Configure reasonable timeouts (60s for tests, 10s for expectations)
- Implement soft assertions for multi-step validations

### Test Execution

- Tests run in parallel by default (`fullyParallel: true`)
- Separate projects for API and UI tests
- Use tags for selective test execution
- Video recording on failure, screenshots on failure, always trace

### Code Quality

- Pre-commit hooks run ESLint and Prettier checks
- No console warnings allowed in production code
- Explicit return types required for all functions
- Playwright-specific ESLint rules enforced

### API Testing

- Use centralized API URLs in `src/api/utils/api.util.ts`
- Test both success and error scenarios
- Validate response structure and required fields
- Use appropriate HTTP status code expectations

### UI Testing

- Test across different user states (logged/non-logged)
- Use data attributes (`getByTestId`) for stable element selection
- Implement proper wait strategies for dynamic content
- Return page objects from navigation methods for chaining

### Performance Considerations

- Configure appropriate timeouts for different operation types
- Use `fullyParallel` execution for faster test runs
- Optimize test data setup and teardown
- Minimize test dependencies between test cases
