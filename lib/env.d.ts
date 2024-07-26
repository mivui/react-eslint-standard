declare module '@eslint/js' {
  import { type Linter } from 'eslint';
  declare const configs: {
    all: Linter.FlatConfig;
    recommended: Linter.FlatConfig;
  };

  export default { configs };
}

declare module 'eslint-config-prettier' {
  import { type Linter } from 'eslint';
  declare const config: Linter.FlatConfig;

  export default config;
}

declare module 'eslint-plugin-react' {
  import { type TSESLint } from '@typescript-eslint/utils';
  declare const plugin: TSESLint.FlatConfig.Plugins;

  export default plugin;
}
