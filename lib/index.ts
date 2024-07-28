import eslint from '@eslint/js';
import { type TSESLint } from '@typescript-eslint/utils';
import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from 'eslint-plugin-vitest';
import tseslint from 'typescript-eslint';
import { tseslintRules } from 'typescript-eslint-standard';

const reactRules: TSESLint.FlatConfig.Rules = {
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
};

export interface Config extends Omit<TSESLint.FlatConfig.Config, 'linterOptions' | 'name' | 'processor'> {
  extends?: TSESLint.FlatConfig.Config[];
  globals?: TSESLint.SharedConfig.GlobalsConfig;
}

export function defineConfig(config?: Config): TSESLint.FlatConfig.ConfigArray {
  const {
    extends: inherit,
    files,
    ignores,
    languageOptions,
    plugins,
    rules,
    globals,
    settings,
  } = config ?? {};
  const inherits = inherit ?? [];
  return tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    prettierConfig,
    prettierRecommended,
    ...inherits,
    {
      name: 'react-eslint-standard',
      files: files ?? ['**/*.{j,t}s', '**/*.{j,t}sx'],
      languageOptions: languageOptions ?? {
        parser: tseslint.parser,
        globals: globals ?? {},
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
        ...plugins,
      },
      rules: {
        ...tseslintRules,
        ...reactRules,
        ...rules,
      },
      ignores: ignores ?? [
        'node_modules',
        'dist',
        'build',
        'package.json',
        '**/*.md',
        ' **/*.svg',
        '**/*.ejs',
        '**/*.html',
      ],
      settings: settings ?? {},
    },
    {
      name: 'vitest-eslint-standard',
      files: ['**/*.{test,spec}.{j,t}s', '**/*.{test,spec}.{j,t}sx'],
      plugins: {
        vitest,
      },
      rules: {
        ...vitest.configs.recommended.rules,
        ...rules,
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
      files: ['**/*.js', '**/*.jsx'],
      ...tseslint.configs.disableTypeChecked,
    },
  );
}
