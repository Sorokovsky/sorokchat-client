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
        project: ['./tsconfig.json'],
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
      require('eslint-config-prettier'), // Prettier має бути останнім
    ],
    rules: {
      '@/quotes': ['error', 'double', { avoidEscape: true }],
      // Правила FSD: заборона імпорту з вищих шарів у нижчі
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          message: '${importType} is not allowed to import ${targetType}',
          rules: [
            { from: 'shared', disallow: ['app', 'pages', 'widgets', 'features', 'entities'] },
            { from: 'entities', disallow: ['app', 'pages', 'widgets', 'features'] },
            { from: 'features', disallow: ['app', 'pages', 'widgets'] },
            { from: 'widgets', disallow: ['app', 'pages'] },
            { from: 'pages', disallow: ['app'] },
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
