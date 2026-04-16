# Contributing to {{name}}

Thank you for your interest in contributing!

## Setup

```sh
git clone <repo>
cd {{name}}
git init
npm install
```

## Adding a new utility

1. Create the function file:
   ```
   src/utils/myUtility.ts
   ```

2. Export it from the public API:
   ```ts
   // src/index.ts
   export { myUtility } from '@/utils/myUtility';
   ```

3. Add tests:
   ```ts
   // src/myUtility.test.ts
   import { describe, it, expect } from 'vitest';
   import { myUtility } from './myUtility';

   describe('myUtility', () => { ... });
   ```

4. Run `npm run build` — all checks must pass before committing.

## Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org/). Run the interactive prompt:

```sh
npm run commit
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Pull requests

1. Create a branch: `feat/my-feature` or `fix/my-bug`
2. Make your changes
3. Ensure `npm run build` passes
4. Open a PR with a clear description

## Code style

- Format: `npm run format` (Prettier)
- Lint: `npm run lint` (ESLint)
- Type-check is enforced by TypeScript

## Reporting issues

Please include:
- Node/npm version
- Steps to reproduce
- Expected vs actual behavior
