// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const boundaries = require('eslint-plugin-boundaries');
const importPlugin = require('eslint-plugin-import');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      boundaries: boundaries,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
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
      require('eslint-config-prettier'),
    ],
    rules: {
      // ========== FSD RULES ==========
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // ========== ЗАБОРОНА ІМПОРТІВ МІЖ РІЗНИМИ МОДУЛЯМИ ОДНОГО ШАРУ ==========
            // Features: заборона між різними features
            {
              target: './src/features/*/*',
              from: './src/features/*',
              except: ['./src/features/*/index.ts'],
              message: 'Між різними features можна імпортувати тільки через index.ts',
            },
            // Entities: заборона між різними entities
            {
              target: './src/entities/*/*',
              from: './src/entities/*',
              except: ['./src/entities/*/index.ts'],
              message: 'Між різними entities можна імпортувати тільки через index.ts',
            },
            // Widgets: заборона між різними widgets
            {
              target: './src/widgets/*/*',
              from: './src/widgets/*',
              except: ['./src/widgets/*/index.ts'],
              message: 'Між різними widgets можна імпортувати тільки через index.ts',
            },
            // Pages: заборона між різними pages
            {
              target: './src/pages/*/*',
              from: './src/pages/*',
              except: ['./src/pages/*/index.ts'],
              message: 'Між різними pages можна імпортувати тільки через index.ts',
            },
            // Shared: заборона між різними shared модулями
            {
              target: './src/shared/*/*',
              from: './src/shared/*',
              except: ['./src/shared/index.ts'],
              message:
                'Між різними shared модулями можна імпортувати тільки через кореневий index.ts',
            },

            // ========== МІЖШАРОВІ ЗАБОРОНИ ==========
            // Заборона імпортів з вищих шарів у нижчі
            {
              target: './src/entities/**/*',
              from: './src/features',
              message: 'Entities не можуть імпортувати з features',
            },
            {
              target: './src/entities/**/*',
              from: './src/widgets',
              message: 'Entities не можуть імпортувати з widgets',
            },
            {
              target: './src/entities/**/*',
              from: './src/pages',
              message: 'Entities не можуть імпортувати з pages',
            },
            {
              target: './src/entities/**/*',
              from: './src/app',
              message: 'Entities не можуть імпортувати з app',
            },
          ],
        },
      ],

      // ========== ДОДАТКОВА ПЕРЕВІРКА ДЛЯ SHARED ==========
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Заборона імпортів з піддиректорій shared
              group: ['@/shared/*/*'],
              message: 'Імпортуйте з shared тільки через @/shared (кореневий)',
            },
          ],
        },
      ],

      // ========== FSD ARCHITECTURE BOUNDARIES ==========
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${importType} → ${targetType} заборонено',
          rules: [
            {
              from: 'shared',
              allow: ['shared', 'app', 'pages', 'widgets', 'features', 'entities'],
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

      // ========== TYPE IMPORTS ==========
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      // ========== IMPORT/EXPORT SORTING ==========
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // ========== ANGULAR SPECIFIC ==========
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

  // ========== ВИНЯТКИ ДЛЯ ТЕСТІВ ==========
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      'import/no-restricted-paths': 'off',
      'boundaries/element-types': 'off',
      'no-restricted-imports': 'off',
    },
  },
);