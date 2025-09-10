# alarife-common

Collection of CLI utilities for Node.js monorepos / workspaces: add license headers, copy structures, and deploy local packages with `yalc`.

Spanish version: [README.ES.md](./README.ES.md)

## Installation

```bash
npm i -D alarife-common
```

Run without prior install:
```bash
npx alarife-common <command> [args]
# or
npx common <command> [args]
```

Supported commands: `add-license`, `copy`, `deployment-yalc`.

---
## add-license
Inserts a standard license header at the start of files across one or multiple projects. Only adds it if it is not already present.

Flags:
- `--path=<path>` Container path holding multiple projects (searches subdirectories with `package.json`).
- `--project-name=<name>` Package name (required if using a path without a **package.json**).
- `--project-author=<author>` Author name (required if using a path without a **package.json**).
- `--project-license=<license>` License id (required if using a path without a **package.json**).
- `--ext=.js,.ts` Comma-separated list. Default `.js`.

Examples:
```bash
# All folders must have a package.json
npx alarife-common add-license --path=./packages --ext=.ts

# Single project (.ts and .js)
npx alarife-common add-license --path=./utils/lib --project-name=@bigbyte/utils --project-author="Jose Eduardo Soria" --project-license=Apache_2.0 --ext=.ts,.js
```

---
## copy
Recursively copies directories (deep) or a single file.

Usage:
```bash
npx alarife-common copy <source> <destination>
```

Behavior:
- Creates destination directories if they do not exist.
- Overwrites existing files.
- If source is a file and destination is a folder, keeps the original filename.
- If source is a folder, replicates the entire structure.

Examples:
```bash
# Copy a single file
npx alarife-common copy ./templates/README.base.md ./packages/pkg-a/README.md

# Recursively copy a folder
npx alarife-common copy ./templates/component ./packages/ui-lib/src/component
```

---
## deployment.yalc
Automates actions over all subdirectories that contain a `package.json` in the current path.

Arguments (triggered if present):
- `install` Runs `npm install` in each package.
- `publish` Runs `npm run yalc:publish` in each package.

Requirements:
- Each package must define in its `package.json` the script:
	```json
	{
		"scripts": {
			"yalc:publish": "yalc publish"
		}
	}
	```
- Have `yalc` available (global or via `npx`).

Examples:
```bash
# Install dependencies
npx alarife-common deployment.yalc install

# Publish to yalc
npx alarife-common deployment.yalc publish

# Install then publish
npx alarife-common deployment.yalc install publish
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by <a href="mailto:alarifeproyect@gmail.com">Jose Eduardo Soria Garcia</a>

<em>Part of the BigByte ecosystem</em>

</div>

