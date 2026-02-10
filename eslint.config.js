//@ts-check
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
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
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
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features/**',
              from: './src/features',
              except: ['**/index.ts', '**/index.tsx', '**/@x/**', '**/@x/index.ts'],
              message: 'Імпортуйте з features тільки через public API (index.ts / index.tsx)',
            },
            {
              target: './src/entities/**',
              from: './src/entities',
              except: ['**/index.ts', '**/index.tsx', '**/@x/**', '**/@x/index.ts'],
              message: 'Імпортуйте з entities тільки через public API (index.ts / index.tsx)',
            },
            {
              target: './src/widgets/**',
              from: './src/widgets',
              except: ['**/index.ts', '**/index.tsx'],
              message: 'Імпортуйте з widgets тільки через public API (index.ts / index.tsx)',
            },
            {
              target: './src/pages/**',
              from: './src/pages',
              except: ['**/index.ts', '**/index.tsx'],
              message: 'Імпортуйте з pages тільки через public API (index.ts / index.tsx)',
            },
            {
              target: './src/shared/**',
              from: './src/shared',
              except: ['**/index.ts', '**/index.tsx'],
            },
          ],
        },
      ],

      'import/no-restricted-paths': [
        'off',
        {
          zones: {
            targets: [
              './src/shared/**/index.ts',
              './src/shared/**/index.tsx',
              './src/features/**/index.ts',
              './src/features/**/index.tsx',
              './src/entities/**/index.ts',
              './src/entities/**/index.tsx',
              './src/widgets/**/index.ts',
              './src/widgets/**/index.tsx',
              './src/pages/**/index.ts',
              './src/pages/**/index.tsx',
              './src/app/**/index.ts',
              './src/app/**/index.tsx',
            ],
          },
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${importType} → ${targetType} заборонено (FSD rule)',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'app', allow: ['*'] },
          ],
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  },
);
