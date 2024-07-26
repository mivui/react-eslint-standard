# ⚡react-eslint-standard

#### quickly start eslint in react.
[![npm version](https://img.shields.io/npm/v/react-eslint-standard.svg?style=flat-square)](https://www.npmjs.com/package/react-eslint-standard)
[![Alt](https://img.shields.io/npm/dt/react-eslint-standard?style=flat-square)](https://npmcharts.com/compare/react-eslint-standard?minimal=true)
![Vite Version](https://img.shields.io/badge/eslint->=9.0.0-brightgreen.svg?style=flat-square)
![Alt](https://img.shields.io/github/license/mivui/react-eslint-standard?style=flat-square)


### install

```shell
npm i react-eslint-standard -D
```

### eslint.config.js

```js
import tseslint from 'typescript-eslint';
import reactEslint from 'react-eslint-standard';

export default tseslint.config(...reactEslint);

```

### .prettierrc.js

```js
/**
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: true,
  endOfLine: 'auto',
};

```