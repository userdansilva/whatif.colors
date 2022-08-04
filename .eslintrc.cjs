module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    indent: ["error", 2],
    "react/jsx-indent": [
      2,
      2,
      { checkAttributes: true, indentLogicalExpressions: true },
    ],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/static-property-placement": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": "warn",
    "no-debugger": "warn",
    semi: ["error", "always"],
    camelcase: "error",
    "linebreak-style": ["error", "unix"],
    quotes: [2, "double"],
    // to verify ---------------------------------
    "object-shorthand": "off",
    "no-tabs": [
      "error",
      {
        allowIndentationTabs: true,
      },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/ban-ts-comment": "off",
    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 4,
      },
    ],
    "no-continue": "off",
    "func-names": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "no-confusing-arrow": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "import/no-cycle": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": "off",
    "react/jsx-closing-bracket-location": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/require-default-props": "off",
  },
};
