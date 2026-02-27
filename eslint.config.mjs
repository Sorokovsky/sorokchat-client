// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      boundaries: boundaries,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
        node: {
          extensions: ['.ts', '.tsx'],
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages' },
        { type: 'widgets', pattern: 'src/widgets' },
        { type: 'features', pattern: 'src/features' },
        { type: 'entities', pattern: 'src/entities' },
        { type: 'shared', pattern: 'src/shared' },
      ],
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^@/entities/.+',
              message: 'З entities імпортуйте ТІЛЬКИ через public API: @/entities',
            },
            {
              regex: '^@/features/.+',
              message: 'З features імпортуйте ТІЛЬКИ через public API: @/features',
            },
            {
              group: ['@/shared/*/**'],
              message: 'З shared імпортуйте тільки через @/shared (без підпапок)',
            },
            {
              group: ['@/entities/*/!(@x)/**'],
              message: 'Між слайсами entities можна імпортувати ТІЛЬКИ через @x/',
            },
            {
              group: ['@/features/*/!(@x)/**'],
              message: 'Між слайсами features можна імпортувати ТІЛЬКИ через @x/',
            },
            {
              group: ['@/shared/*/**'],
              message: 'Імпортуйте з shared тільки через @/shared',
            },
          ],
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${importType} → ${targetType} заборонено',
          rules: [
            {
              from: 'shared',
              allow: ['shared'],
            },
            {
              from: 'entities',
              allow: ['entities', 'shared'],
            },
            {
              from: 'features',
              allow: ['features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'pages',
              allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'app',
              allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'],
            },
          ],
        },
      ],
      '@typescript-eslint/no-inferrable-types': ['off'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      'import/no-restricted-paths': 'off',
      'no-restricted-imports': 'off',
      'boundaries/element-types': 'off',
    },
  },
);
