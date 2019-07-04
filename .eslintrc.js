module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier/@typescript-eslint',
    "plugin:prettier/recommended",
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "react/prop-types": 0,
    "@typescript-eslint/explicit-function-return-type":  0,

  },
  settings: {
    react: {
      version: "detect"
    }
  }
};