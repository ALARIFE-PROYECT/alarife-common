# alarife-common (Summary)

Shared CLI library and utilities for the ALARIFE ecosystem. Each subfolder or script has (or will have) its own detailed README; below is only a concise feature list.

## Main Structure

- `alarife-common/` NPM package `@alarife/common` (main CLI command: `common`).
- `_documentation/` Internal templates and guides.

## Scripts (src)

- `add-license.js` Automatically prepends a license header to files (`--path`, `--ext`, reads name/author/license from package.json or CLI flags).
- `copy.js` Copies a single file from source to destination (usage: `node src/copy.js <source> <dest>`).
- `deployment.yalc.js` Iterates Node projects and runs `npm install` and/or `npm run yalc:publish` based on flags (`install`, `publish`).

## Quick Install

```bash
npm install @alarife/common --save-dev
# or globally
npm install -g @alarife/common
```

## Quick Example (add-license)

```bash
common add-license --path=./ --ext=.ts
```
