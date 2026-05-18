import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: [
    'public/**',
    'dist/**',
    'build/**',
    '.next/**',
    'out/**',
    'coverage/**',
    'node_modules/**',
  ],
  printWidth: 100,
  singleQuote: true,
  sortImports: { newlinesBetween: false },
  sortTailwindcss: true,
});
