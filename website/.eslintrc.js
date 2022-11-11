const eslintConfig = require("@keeex/eslint-config");

module.exports = eslintConfig(
  {
    base: true,
    promise: true,
    jsx: true,
    reacthooks: true,
  },
  {
    env: {
      es6: true,
      node: true,
      browser: true,
    },
    overrides: [
      {
        files: ["*.js"],
        rules: {
          "react/display-name": "off",
          "import/extensions": "off",
          "max-lines-per-function": "off",
          "import/no-anonymous-default-export": "off",
          "no-magic-numbers": "off",
        },
      },
      {
        files: ["src/admin/src/pages/**/*.js"],
        rules: {
          "import/no-extraneous-dependencies": "off",
          "import/no-unresolved": "off",
        },
      },
    ],
  },
);
