// eslint.config.js
export default {
    languageOptions: {
        globals: {
            // Define global variables
            browser: true,
            es2021: true,
        },
        parser: '@babel/eslint-parser',
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    plugins: ['react', 'import'],
    rules: {
        'import/named': 'error',
        'import/default': 'error',
        'import/order': [
            'error',
            {
                groups: [['builtin', 'external', 'internal']],
                'newlines-between': 'always',
            },
        ],
        'no-unused-vars': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },
};
