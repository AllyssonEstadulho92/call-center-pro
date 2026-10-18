import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// No GitHub, o nome do repositório determina o caminho público.
// Em desenvolvimento local, a aplicação abre na raiz "/".
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
