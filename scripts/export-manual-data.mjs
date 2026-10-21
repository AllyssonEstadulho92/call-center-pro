import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const output = resolve(process.argv[2] ?? '.tmp/manual-data.json');
const source = `
import { procedures } from './src/data/knowledge.ts';
import { manualGuides } from './src/data/manuals.ts';
import { callSafetyPhrases } from './src/data/callSafetyPhrases.ts';
import { getClosingGuidance } from './src/lib/callOutcomes.ts';
import { publicSources } from './src/data/publicSources.ts';
export const exported = {
  procedures,
  manualGuides,
  callSafetyPhrases,
  publicSources,
  closingOptions: Object.fromEntries(procedures.map(p => [
    p.id,
    p.steps.map(s => getClosingGuidance(p,s)),
  ])),
};
`;
const bundled = await build({
  stdin: { contents: source, resolveDir: process.cwd(), sourcefile: 'manual-source.ts', loader: 'ts' },
  bundle: true, platform: 'node', format: 'esm', write: false, target: 'es2022',
});
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(bundled.outputFiles[0].contents).toString('base64');
const { exported } = await import(moduleUrl);
if (exported.procedures.length !== 17) throw new Error('Catálogo inesperado: os 17 guiões devem estar presentes.');
for (const project of ['coca-cola','burger-king']) {
  if (!exported.procedures.some(p => p.project === project) || !exported.manualGuides[project]) {
    throw new Error('Manual sem conteúdo: ' + project);
  }
}
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(exported, null, 2) + '\n', 'utf8');
console.log('Fonte PDF preparada: ' + exported.procedures.length + ' guiões.');