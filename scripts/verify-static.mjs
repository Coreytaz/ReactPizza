// Dependency-free smoke check: intended to work before pnpm install.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const cwd = process.cwd();
const manifest = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
const pkg = (name) => manifest.dependencies?.[name] ?? manifest.devDependencies?.[name];

assert.match(manifest.packageManager, /^pnpm@12\./);
assert.ok(pkg('vite') && pkg('react') && pkg('typescript') && pkg('vitest'));
assert.ok(!pkg('react-scripts') && !pkg('react-router-dom'));
assert.ok(!existsSync(join(cwd, 'package-lock.json')));
assert.ok(!existsSync(join(cwd, 'public', 'index.html')));
assert.ok(existsSync(join(cwd, 'vite.config.ts')));
assert.ok(existsSync(join(cwd, 'src', 'main.tsx')));
const html = readFileSync(join(cwd, 'index.html'), 'utf8');
assert.match(html, /src\/main\.tsx/);
assert.doesNotMatch(html, /%PUBLIC_URL%/);

const extensions = ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css', '.svg', '.png', '.json'];
let scanned = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!['.ts', '.tsx'].includes(extname(file))) continue;
    scanned++;
    const code = readFileSync(file, 'utf8');
    assert.doesNotMatch(code, /from ['"]react-router-dom['"]/);
    const imports = code.matchAll(/(?:import|export)\s+(?:[^'"\n]+?\s+from\s+)?['"]([^'"]+)['"]/g);
    for (const [, spec] of imports) {
      if (!spec.startsWith('.')) continue;
      const absolute = resolve(dirname(file), spec);
      const candidates = [absolute, ...extensions.map((ext) => absolute + ext),
        ...extensions.map((ext) => join(absolute, 'index' + ext))];
      assert.ok(candidates.some(existsSync), `Missing import ${spec} in ${file}`);
    }
  }
}
walk(join(cwd, 'src'));
console.log(`PASS: checked ${scanned} TS/TSX files, local imports, Vite and pnpm configuration`);
