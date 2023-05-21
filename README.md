# vator

[![NPM][npm-img]][npm-url]
[![Build][build-img]][build-url]
[![Coverage][coverage-img]][coverage-url]
[![License][license-pic]][license-url]

Values and types validator for Node.js.
Asserts type of provided data and throws errors if types/values are not valid.

## Installation

```bash
npm install vator
```

## Usage

```js
// ESM or TypeScript projects:
import vator from 'vator';

// CommonJS projects:
const { vator } = require('vator');
```

## Available utilities

1. [logger](./docs/logger.md)
2. [timeout](./docs/timeout.md)
3. [flag](./docs/flag.md)
4. [prettify](./docs/prettify.md)
5. [rand](./docs/rand.md)
6. [http](./docs/httpClient.md)
7. [clone](./docs/clone.md)
8. [floats](./docs/floats.md)
9. [validate / buildSchema](./docs/validate.md)

[npm-img]: https://img.shields.io/npm/v/vator.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/vator
[build-img]: https://img.shields.io/github/actions/workflow/status/andr-ii/vator/build.yml?logo=github
[build-url]: https://github.com/andr-ii/vator/actions/workflows/build.yml
[coverage-img]: https://img.shields.io/coverallsCoverage/github/andr-ii/vator?label=coverage&logo=jest
[coverage-url]: https://coveralls.io/github/andr-ii/vator?branch=master
[license-pic]: https://img.shields.io/github/license/andr-ii/vator?color=blue&label=%C2%A9%20license
[license-url]: https://github.com/andr-ii/vator/blob/master/LICENSE
