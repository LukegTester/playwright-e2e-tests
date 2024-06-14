# Tests for GAD application

## GAD Application

Repository: https://github.com/jaktestowac/gad-gui-api-demo

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky init`

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep "@GAD-R01-02"
```

Run all tests without tags:

```
npx playwright test --grep-invert "@GAD-R01-02"
```

For more usage cases look in `package.json` scripts section.
