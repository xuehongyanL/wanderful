module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "semi-spacing": 2,
    "no-var": 2,
    "no-console": "off",
    "no-mixed-operators": 0,
    "no-unused-expressions": 0,
    "no-unused-vars": 0,
    "space-infix-ops": 2,
    "array-bracket-spacing": [2,"never"],
    "comma-spacing": [2, {"before":false,"after":true}],
    "key-spacing": 2,
    "object-curly-spacing": 2,
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/destructuring-assignment": [0, 'always'],
  },
  settings: {
    "import/ignore": ["node_modules"]
  }
};
