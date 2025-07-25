import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import n from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import playwright from 'eslint-plugin-playwright';
import preferArrows from 'eslint-plugin-prefer-arrow-functions';
import prettier from 'eslint-plugin-prettier/recommended';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = tseslint.config(
  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      comments.recommended,
      promise.configs['flat/recommended'],
      regexp.configs['flat/recommended'],
      n.configs['flat/recommended-script'],
      perfectionist.configs['recommended-natural'],
      security.configs.recommended,
      sonarjs.configs.recommended,
      unicorn.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      prettier,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs'],
          defaultProject: './tsconfig.json',
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 0,
        },
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'prefer-arrow-functions': preferArrows,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',

      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/indent': 'off',
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/member-delimiter-style': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/no-tabs': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': 'off',
      '@stylistic/semi': 'off',

      curly: 'warn',

      'n/no-extraneous-import': 'off',
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',

      'perfectionist/sort-imports': 'off',

      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      'security/detect-object-injection': 'off',

      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'warn',

      'unicorn/no-nested-ternary': 'warn',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prevent-abbreviations': 'off',

      'regexp/no-unused-capturing-group': 'off',
      'regexp/optimal-quantifier-concatenation': 'off',
      'regexp/no-super-linear-backtracking': 'warn',
    },
    settings: {
      'import/resolver': {
        alwaysTryTypes: true,
        node: true,
        project: import.meta.url,
        typescript: true,
      },
      react: {
        version: 'detect',
      },
    },
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    files: ['tests/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'unicorn/no-null': 'off',
      ...playwright.configs['flat/recommended'].rules,
    },
  },

  {
    ignores: [
      '**/test-results/**',
      '**/playwright-report/**',
      '**/.vercel/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/out/**',
      '**/*.min.js',
      '**/*.d.ts',
      '**/public/**',
      '**/.git/**',
      '**/.vscode/**',
      '**/.idea/**',
    ],
  },
);

export default eslintConfig;
