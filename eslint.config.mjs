import globals from "globals";
import pluginJs from "@eslint/js";
import prettiereslintrecommended from "eslint-plugin-prettier/recommended";
import jesteslint from "eslint-plugin-jest";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  },
  prettiereslintrecommended,
  {
    rules: {
      "prettier/prettier": ["error"]
    }
  },
  {
    files: ["src/**/*.test.js"],
    ...jesteslint.configs['flat/recommended'],
    rules: {
      ...jesteslint.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off'
    }
  }
];
