import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'next-env.d.ts',
      'docs/source/**',
    ],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    rules: {
      // Unused code is a correctness signal, not a style preference.
      // Underscore prefix is the documented escape hatch.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // FULL_BUILD §16: untyped values slip past validation.
      '@typescript-eslint/no-explicit-any': 'error',

      // MASTER_PROMPT §28: never surface internals to users. Server logging
      // gets a deliberate wrapper in a later phase; console is not it.
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Type-only imports must be explicit — verbatimModuleSyntax is on.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  {
    // Config files, tests and Node-side dev scripts run outside the app
    // runtime, and reporting to stdout is their purpose.
    files: ['*.config.{mjs,ts}', 'tests/**/*.ts', 'scripts/**/*.{mjs,ts}'],
    rules: {
      'no-console': 'off',
    },
  },
];

export default config;
