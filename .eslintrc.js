module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@stencil-community/recommended", // Enables @stencil-community/eslint-plugin.
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    "prettier/prettier": 0,
    "@stencil-community/async-methods": "warn",
    "@stencil-community/element-type": "warn", // This rule catches Stencil Element decorator have the correct type
    "@stencil-community/methods-must-be-public": "warn", // This rule catches Stencil Methods marked as private or protected
    "@stencil-community/no-unused-watch": "warn", // This rule catches Stencil Watchs with non existing Props or States
    "@stencil-community/own-methods-must-be-private": "warn", // This rule catches own class methods marked as public
    "@stencil-community/own-props-must-be-private": "warn", // This rule catches own class properties marked as public
    "@stencil-community/prefer-vdom-listener": "warn", // This rule catches Stencil Listen with vdom events
    "@stencil-community/props-must-be-public": "warn", // This rule catches Stencil Props marked as private or protected
    "@stencil-community/props-must-be-readonly": "warn", // This rule catches Stencil Props marked as non readonly, excluding mutable ones
    "@stencil-community/required-jsdoc": "warn", // This rule catches Stencil Props, Methods and Events to define jsdoc
    "@stencil-community/required-prefix": ["warn", ["gxg-"]], // Ensures that a Component's tag use the "gx-" prefix.
    "@stencil-community/single-export": "warn", // This rule catches modules that expose more than just the Stencil Component itself
    "@stencil-community/strict-boolean-conditions": "off",
    "@stencil-community/strict-mutable": "warn",
    "@stencil-community/decorators-style": [
      "warn",
      {
        prop: "inline",
        state: "inline",
        element: "inline",
        method: "multiline",
        watch: "multiline",
        listen: "multiline",
      },
    ],
  },
};
