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
            // ========== FSD RULES - СТРОГИЙ STEIGER ==========
            // 1. Заборона реекспортів між модулями одного шару
            // 2. Тільки Public API через index.ts

            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        // ========== ЗАБОРОНА РЕЕКСПОРТІВ ВСЕРЕДИНІ ШАРУ ==========
                        // Features: повна заборона імпортів між різними features (окрім index.ts)
                        {
                            target: './src/features/**/*',
                            from: './src/features',
                            except: [
                                './src/features/**/index.ts',
                                './src/features/**/index.tsx',
                            ],
                            message: 'Між різними features заборонено будь-які імпорти (окрім public API через index.ts)',
                        },
                        // Entities: повна заборона імпортів між різними entities
                        {
                            target: './src/entities/**/*',
                            from: './src/entities',
                            except: [
                                './src/entities/**/index.ts',
                                './src/entities/**/index.tsx',
                            ],
                            message: 'Між різними entities заборонено будь-які імпорти (окрім public API через index.ts)',
                        },
                        // Widgets: повна заборона імпортів між різними widgets
                        {
                            target: './src/widgets/**/*',
                            from: './src/widgets',
                            except: [
                                './src/widgets/**/index.ts',
                                './src/widgets/**/index.tsx',
                            ],
                            message: 'Між різними widgets заборонено будь-які імпорти (окрім public API через index.ts)',
                        },
                        // Pages: повна заборона імпортів між різними pages
                        {
                            target: './src/pages/**/*',
                            from: './src/pages',
                            except: [
                                './src/pages/**/index.ts',
                                './src/pages/**/index.tsx',
                            ],
                            message: 'Між різними pages заборонено будь-які імпорти (окрім public API через index.ts)',
                        },
                        // Shared: повна заборона імпортів між різними shared модулями
                        {
                            target: './src/shared/**/*',
                            from: './src/shared',
                            except: [
                                './src/shared/**/index.ts',
                                './src/shared/**/index.tsx',
                            ],
                            message: 'Між різними shared модулями заборонено будь-які імпорти (окрім public API через index.ts)',
                        },

                        // ========== ЗАБОРОНА РЕЕКСПОРТІВ МІЖ ШАРАМИ ==========
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
                            target: './src/entities/**/*',
                            from: './src/app',
                            message: 'Entities не можуть імпортувати з app (FSD rule)',
                        },
                    ],
                },
            ],

            // ========== ДОДАТКОВА ПЕРЕВІРКА РЕЕКСПОРТІВ ==========
            'import/no-re-export': ['error', { allowExportAll: false }],

            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ExportAllDeclaration',
                    message: 'Заборонено використовувати export * (реекспорт)',
                },
                {
                    selector: 'ExportNamedDeclaration[source]',
                    message: 'Заборонено реекспорти між модулями. Використовуйте прямі імпорти через Public API',
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
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
    },

    // ========== ВИНЯТКИ ДЛЯ PUBLIC API ФАЙЛІВ ==========
    {
        files: [
            'src/**/index.ts',
            'src/**/index.tsx',
            'src/**/public-api.ts',
            'src/**/api.ts'
        ],
        rules: {
            'import/no-restricted-paths': 'off',
            'no-restricted-syntax': 'off',
            'import/no-re-export': 'off',
        },
    },

    // ========== ВИНЯТКИ ДЛЯ ТЕСТІВ ==========
    {
        files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
        rules: {
            'import/no-restricted-paths': 'off',
            'boundaries/element-types': 'off',
            'no-restricted-syntax': 'off',
            'import/no-re-export': 'off',
        },
    },
);