// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import { dts } from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { resolve as pathResolve } from 'path';
import packageJson from './package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcAlias = alias({
  entries: [{ find: '@', replacement: pathResolve(__dirname, 'src') }],
});

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true },
      { file: 'dist/index.umd.js', format: 'umd', name: 'myPackage', globals: {} },
    ],
    plugins: [srcAlias, resolve({ browser: true }), commonjs(), typescript(), terser()],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [srcAlias, dts()],
  },
];
