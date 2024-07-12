# Introduction to Coding Standards

This guide serves as a reference for our development team, outlining the best practices and conventions we follow when writing code. Consistent coding standards not only enhance the readability of our codebase but also promote collaboration and maintainability.

## Model Names

- Model names should be written in PascalCase.
- Models should be named in a way that clearly reflects their role or content.

**Examples:**

```typescript
// ✅
interface UserModel { ... }
interface OrderDetailsModel { ... }

// ❌
interface userData { ... }
interface data { ... }
```

## Locator Names

- Locator names (UI elements) should be written in camelCase.
- Locators should be named in a descriptive manner that clearly indicates what they represent.

**Examples:**

```typescript
// ✅
userEmailInput = this.page.getByPlaceholder('Enter User Email');
loginButton = this.page.getByRole('button', { name: 'LogIn' });

// ❌
Btn = this.page.getByPlaceholder('Enter User Email');
el1 = this.page.getByRole('button', { name: 'LogIn' });
```

## Method Names

- Method names should be written in camelCase.
- The method name should follow the format `verbNoun`.
- Method names should be chosen to clearly describe their action or purpose.

**Examples:**

```typescript
// ✅
function getUserData(userId: string): UserData { ... }
function validateUserInput(input: string): boolean { ... }

// ❌
function xyz() { ... }
function check() { ... }
```

## Extracting Expected Values from Assertions

- In assertions, values should be extracted and assigned to variables before use in further code.

**Example:**

```typescript
// ✅
expectedValue = 'My expected text';
expect(result).toBe(expectedValue);

// ❌
expect(someFunction()).toBe('My expected text');
```

## AAA (Arrange-Act-Assert)

- Test code should be organized following the AAA principle: Arrange (Preparation), Act (Action), Assert (Assertion).
- Preparation is the stage where we set up test data and conditions.
- Action is the stage where we perform the action being tested.
- Assertion is the stage where we check if the action executed correctly.

**Example:**

```typescript
// ✅
test('Some test description', () => {
  // Arrange
  const expectedError = 'xyz';
  const myPage = new myPage();
  const data = prepareData();
  const myPage.customAction(data);

  // Act
  const result = doSomethingWithData(data);

  // Assert
  expect(result).toBe(expectedError);
});
```

## Messages in Assertions

- Avoid using messages in assertions unless it's necessary for test clarity.

**Examples:**

```typescript
// ✅
await expect(page.getByText('Name'), 'User should be logged in').toBeVisible();

// ✅
await expect(page.getByText('Name')).toHaveText(expectedText);
```

## Access Modifiers

- Avoid using explicit access modifiers (e.g., `public`, `private`) in variable and method declarations unless it's necessary for implementation

**Example:**

```typescript
// ✅
class MyClass {
  myProperty: string;

  constructor() {
      this.myProperty = 'Hello';
  }

  myMethod() {
      return this.myProperty;
  }
}

// ❌
class MyClass {
  public myProperty: string;

  constructor() {
      this.myProperty = 'Hello';
  }

  public myMethod() {
      return this.myProperty;
  }
}
```
