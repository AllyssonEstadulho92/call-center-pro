import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// No GitHub, o nome do repositório determina o caminho público.
// Em desenvolvimento local, a aplicação abre na raiz "/".
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  plugins: [react()],
  // A fonte React/TypeScript é app.html. O index.html da raiz contém
  // a compilação estática publicada pelo GitHub Pages.
  build: { rollupOptions: { input: resolve(__dirname, 'app.html') } },
  base: repoName ? `/${repoName}/` : '/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
