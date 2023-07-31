/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'universe/shared/typescript-analysis',
    'universe/native',
    '@react-native',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  plugins: ['react', 'react-hooks', 'react-native', '@react-native', '@typescript-eslint'],
  globals: {
    __TEST__: false,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
    'max-lines-per-function': ['error', 70],
    'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'react/require-default-props': 'off', // Allow non-defined react props as undefined
    'comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
  },
};
