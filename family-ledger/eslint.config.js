import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*.{ts,tsx}'],
      'boundaries/ignore': ['**/*.d.ts'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/components/**/*',
            'src/hooks/**/*',
            'src/utils/**/*',
            'src/lib/**/*',
            'src/layouts/**/*',
            'src/services/**/*',
            'src/context/**/*',
            'src/data/**/*',
            'src/assets/**/*',
          ],
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          pattern: ['src/app/**/*'],
        },
      ],
    },
    rules: {
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: [{ type: 'shared' }],
              allow: [{ to: { type: 'shared' } }],
            },
            {
              from: [{ type: 'feature' }],
              allow: [
                { to: { type: 'shared' } },
                {
                  to: {
                    type: 'feature',
                    captured: { featureName: '{{from.captured.featureName}}' },
                  },
                },
              ],
            },
            {
              from: [{ type: 'app' }],
              allow: [
                { to: { type: 'shared' } },
                { to: { type: 'feature' } },
                { to: { type: 'app' } },
              ],
            },
          ],
        },
      ],
    },
  },
])
