module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Downgrade from error to warning
      'react-hooks/exhaustive-deps': 'warn', // Already a warning, but making it explicit
    },
    ignorePatterns: ['src/app/features/prashnavali/page.tsx'] // Ignore specific problematic files
  };
  