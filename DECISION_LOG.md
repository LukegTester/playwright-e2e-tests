# This file contain concept decisions for GAD automation framework

## Integration of code style tools in framework

**ID**: 001  
**Status**: Decided  
**Date**: 2024/06/12  
**Context**:
We need static code analysis tools for:

- unified code standard in framework
- better code readability
- easy code formatting actions

**Proposed solution**

- ESLint for linting coding rules for TypeScript files
- Prettier for formatting files
- Husky for running linting scripts

**Pros**: Tools automate formatting and code style maintenance activities

**Cons**: New tools add more complexity to solution and require maintenance

**Decision**: Use Prettier, ESLint and Husky to provide hight code standard across framework

**Creator**: Łukasz G
