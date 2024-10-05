import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['results'],
    },
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            jest: jestPlugin
        },
        languageOptions: {
            parser: tseslint.parser,
        },
        rules: {
        },
    },
);
