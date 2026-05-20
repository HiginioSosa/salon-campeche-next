import nextConfig from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
]

export default eslintConfig



