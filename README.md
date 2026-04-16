# @kumarad9/create-package

Scaffold a production-ready TypeScript package in seconds.

## Usage

```sh
npx @kumarad9/create-package my-lib
npm init @kumarad9/package my-lib
```

Or with options:

```sh
npx @kumarad9/create-package my-lib \
  --name my-lib \
  --description "My awesome library" \
  --license MIT \
  --github-user kumarad9
```

## What you get

- TypeScript + Rollup (CJS, ESM, UMD)
- Vitest (testing)
- ESLint + Prettier
- Husky + commitlint + czg (commit workflow)
- Typedoc (API docs)
- GitHub Actions CI + Release workflows
- Semantic-release (auto versioning & publishing)

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--name` | Package name | Directory name |
| `--description` | Package description | Empty |
| `--license` | License | MIT |
| `--github-user` | GitHub username for badges | Empty |
| `--no-git` | Skip git init | false |
| `--no-install` | Skip npm install | false |

## Requirements

- Node.js >= 18
- Git (optional, for husky hooks)

## License

MIT
