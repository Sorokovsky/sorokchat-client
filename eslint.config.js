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
      // ========== СПРОЩЕНІ FSD ПРАВИЛА ==========
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // ========== ГЛОВНЕ ПРАВИЛО: МІЖ СЛАЙСАМИ ТІЛЬКИ ЧЕРЕЗ @x/ ==========
            {
              target: './src/entities/**/*',
              from: './src/entities/*',
              except: [
                // Дозволити імпорти всередині одного слайса
                './src/entities/*/**',
                // Дозволити шляхи з @x/
                './src/entities/*/@x/**',
                './src/entities/**/@x/**',
              ],
              message:
                'Між різними слайсами entities можна імпортувати ТІЛЬКИ через @x/ директорію',
            },

            // Аналогічно для features
            {
              target: './src/features/**/*',
              from: './src/features/*',
              except: ['./src/features/*/**', './src/features/*/@x/**', './src/features/**/@x/**'],
              message:
                'Між різними слайсами features можна імпортувати ТІЛЬКИ через @x/ директорію',
            },

            // ========== МІЖШАРОВІ ПРАВИЛА ==========
            // Features → Entities (тільки через index.ts)
            {
              target: './src/features/**/*',
              from: './src/entities/*',
              except: ['./src/entities/*/index.ts'],
              message: 'Features можуть імпортувати з Entities тільки через index.ts',
            },

            // Заборона зворотних імпортів
            {
              target: './src/entities/**/*',
              from: './src/features',
              message: 'Entities не можуть імпортувати з Features',
            },
          ],
        },
      ],

      // ========== ДОДАТКОВА ПЕРЕВІРКА ЧЕРЕЗ no-restricted-imports ==========
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Заборонити імпорти між слайсами без @x/
            {
              group: ['@/entities/*/!(@x)/**'],
              message: 'Між слайсами entities можна імпортувати ТІЛЬКИ через @x/',
            },
            {
              group: ['@/features/*/!(@x)/**'],
              message: 'Між слайсами features можна імпортувати ТІЛЬКИ через @x/',
            },
            // Заборонити імпорти з shared піддиректорій
            {
              group: ['@/shared/*/**'],
              message: 'Імпортуйте з shared тільки через @/shared',
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
      '@typescript-eslint/no-inferrable-types': ['off'],
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

  // ========== ВИНЯТКИ ==========
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      'import/no-restricted-paths': 'off',
      'no-restricted-imports': 'off',
      'boundaries/element-types': 'off',
    },
  },
);
