//eslint-disable-next-line
module.exports = {
    parser: '@babel/eslint-parser', // Use if you're using Babel for JSX and ES6 features
    parserOptions: {
        ecmaVersion: 2015, // Set to 2015 or a higher version
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
    "settings": {
      "react": {
        "version": "18" // Replace with your React version
      },
    },
    "env": {
      "browser": true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
    rules: {
      // Add your custom rules here
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/label-has-associated-control": "off",
      // ... other rules
    },
  };

  