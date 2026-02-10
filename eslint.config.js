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
        {
          type: 'app',
          pattern: 'src/app',
          mode: 'folder',
        },
        {
          type: 'pages',
          pattern: 'src/pages',
          mode: 'folder',
        },
        {
          type: 'widgets',
          pattern: 'src/widgets',
          mode: 'folder',
        },
        {
          type: 'features',
          pattern: 'src/features',
          mode: 'folder',
        },
        {
          type: 'entities',
          pattern: 'src/entities',
          mode: 'folder',
        },
        {
          type: 'shared',
          pattern: 'src/shared',
          mode: 'folder',
        },
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
      // ========== FSD RULES - STEIGER STYLE ==========
      // 1. Всередині модуля (каталогу) - можна імпортувати що завгодно
      // 2. Між модулями одного шару - тільки через Public API
      // 3. Між шарами - за правилами FSD

      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // ========== МІЖ МОДУЛЯМИ ОДНОГО ШАРУ ==========
            // Features: між різними features - тільки через Public API
            {
              target: './src/features/*/*',
              from: './src/features',
              except: [
                './src/features/*/index.ts',
                './src/features/*/index.tsx',
                './src/features/*/public-api.ts',
                './src/features/*/api.ts',
              ],
              message: 'Між різними features імпортуйте тільки через public API (index.ts)',
            },
            // Entities: між різними entities - тільки через Public API
            {
              target: './src/entities/*/*',
              from: './src/entities',
              except: [
                './src/entities/*/index.ts',
                './src/entities/*/index.tsx',
                './src/entities/*/public-api.ts',
              ],
              message: 'Між різними entities імпортуйте тільки через public API (index.ts)',
            },
            // Widgets: між різними widgets - тільки через Public API
            {
              target: './src/widgets/*/*',
              from: './src/widgets',
              except: [
                './src/widgets/*/index.ts',
                './src/widgets/*/index.tsx',
                './src/widgets/*/public-api.ts',
              ],
              message: 'Між різними widgets імпортуйте тільки через public API (index.ts)',
            },
            // Pages: між різними pages - тільки через Public API
            {
              target: './src/pages/*/*',
              from: './src/pages',
              except: [
                './src/pages/*/index.ts',
                './src/pages/*/index.tsx',
                './src/pages/*/public-api.ts',
              ],
              message: 'Між різними pages імпортуйте тільки через public API (index.ts)',
            },
            // Shared: між різними shared модулями - тільки через Public API
            {
              target: './src/shared/*/*',
              from: './src/shared',
              except: [
                './src/shared/*/index.ts',
                './src/shared/*/index.tsx',
                './src/shared/*/public-api.ts',
              ],
              message: 'Між різними shared модулями імпортуйте тільки через public API (index.ts)',
            },

            // ========== МІЖ ШАРАМИ ==========
            // Заборона імпортів з вищих шарів у нижчі
            {
              target: './src/entities/**/*',
              from: './src/features',
              message: 'Entities не можуть імпортувати з features (FSD rule)',
            },
            {
              target: './src/entities/**/*',
              from: './src/widgets',
              message: 'Entities не можуть імпортувати з widgets (FSD rule)',
            },
            {
              target: './src/entities/**/*',
              from: './src/pages',
              message: 'Entities не можуть імпортувати з pages (FSD rule)',
            },
            {
              target: './src/features/**/*',
              from: './src/widgets',
              except: ['./src/widgets/*/index.ts', './src/widgets/*/index.tsx'],
              message: 'Features можуть імпортувати з widgets тільки через public API',
            },
            {
              target: './src/features/**/*',
              from: './src/pages',
              message: 'Features не можуть імпортувати з pages (FSD rule)',
            },
            {
              target: './src/widgets/**/*',
              from: './src/pages',
              except: ['./src/pages/*/index.ts', './src/pages/*/index.tsx'],
              message: 'Widgets можуть імпортувати з pages тільки через public API',
            },
          ],
        },
      ],

      // ========== FSD ARCHITECTURE BOUNDARIES ==========
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${importType} → ${targetType} заборонено (FSD rule)',
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

      // ========== ADDITIONAL STEIGER-STYLE RULES ==========
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            // Дозволити імпорти всередині одного модуля
            'src/**/*',
            // Дозволити імпорти через Public API
            'src/*/index.ts',
            'src/*/index.tsx',
            'src/*/public-api.ts',
            'src/*/api.ts',
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/src/features/*/*', '!**/src/features/*/index.ts'],
              message: 'Використовуйте barrel exports (index.ts) для імпорту з інших features',
            },
            {
              group: ['**/src/entities/*/*', '!**/src/entities/*/index.ts'],
              message: 'Використовуйте barrel exports (index.ts) для імпорту з інших entities',
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
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Angular imports
            ['^@angular'],
            // External packages
            ['^@?\\w'],
            // Internal FSD layers
            ['^@/app'],
            ['^@/pages'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared'],
            // Relative imports
            ['^\\.\\.'],
            ['^\\.'],
          ],
        },
      ],
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

  // ========== TEST FILES EXCEPTIONS ==========
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      'import/no-restricted-paths': 'off',
      'boundaries/element-types': 'off',
      'import/no-internal-modules': 'off',
      'no-restricted-imports': 'off',
    },
  },
);
