import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', '.prerender-ssr', '.analysis', 'node_modules'] },

  // Browser code: everything the app ships.
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Build tooling runs in Node, not the browser. Linting it with browser
  // globals reported `process` as undefined in vite.config.js.
  {
    files: ['*.config.js', 'scripts/**/*.mjs', 'src/entry-prerender.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // Schema factories and theme helpers legitimately export non-components
  // alongside one; Fast Refresh is a dev-only concern there.
  {
    files: [
      'src/components/seo/JsonLd.jsx',
      'src/components/integrations/BookingEmbed.jsx',
      'src/hooks/useTheme.jsx',
    ],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
]
