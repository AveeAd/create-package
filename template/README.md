# {{name}}

[![CI](https://github.com/{{github-user}}/{{name}}/actions/workflows/ci.yml/badge.svg)](https://github.com/{{github-user}}/{{name}}/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/{{name}}.svg)](https://www.npmjs.com/package/{{name}})
[![TypeScript](https://img.shields.io/badge/TypeScript-yes-blue.svg)](https://www.typescriptlang.org/)

{{description}}

## Install

```sh
git init
npm install
```

### Git hooks

- **commit-msg** — validates commit messages (Conventional Commits format)
- **pre-commit** — runs `npm run build`

## Usage

```ts
import { add, repeat, capitalize } from '{{name}}';

add(2, 3);           // 5
repeat('a', 3);      // 'aaa'
capitalize('hello'); // 'Hello'
```

## Development

```sh
npm run commit      # interactive commit message (czg)
npm run build       # format → lint → test:run → rollup
npm run docs        # generate API docs (typedoc)
npm run test        # vitest (watch mode)
npm run test:run   # vitest (CI)
npm run lint        # eslint
npm run format      # prettier --write
```

## Package outputs

This package ships three formats:

| Format | File | Use case |
|--------|------|----------|
| CommonJS | `dist/index.cjs` | Node.js `require()` |
| ES Module | `dist/index.mjs` | Node.js `import`, bundlers |
| UMD | `dist/index.umd.js` | Browsers (global `myPackage`) |

Type declarations are at `dist/index.d.ts`.

## Customizing this package

1. Search-replace all `{{name}}`, `{{description}}`, `{{license}}`, `{{github-user}}` placeholders in all files
2. Set the UMD global name in `rollup.config.mjs` (`name: 'myPackage'`)
3. Fill in `LICENSE` with your actual license text
4. Add your code to `src/index.ts`
5. Run `npm install && npm run build`
