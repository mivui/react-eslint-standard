import eslint from '@eslint/js';
import { type TSESLint } from '@typescript-eslint/utils';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from 'eslint-plugin-vitest';
import tseslint from 'typescript-eslint';
import { eslintRules, typescriptRules } from 'typescript-eslint-standard';

const reactRules: TSESLint.FlatConfig.Rules = {
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
};

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  prettierConfig,
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        NodeJS: false,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintRules,
      ...typescriptRules,
      ...reactRules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    ignores: [
      'node_modules',
      'dist',
      'build',
      'package.json',
      '**/*.md',
      ' **/*.svg',
      '**/*.ejs',
      '**/*.html',
    ],
  },
  {
    files: ['**/*.{test,spec}.{j,t}s'],
    plugins: {
      vitest,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintRules,
      ...typescriptRules,
      ...vitest.configs.recommended.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
);
