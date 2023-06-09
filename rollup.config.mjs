import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'main.ts', // Entry point for your plugin
  output: {
    file: '/mnt/c/Users/Jesús/Documents/vault/.obsidian/plugins/obsidian-note-generator/main.js', // Output path for the bundled JavaScript
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(), // Resolves node_modules dependencies
    typescript(), // Compiles TypeScript code
    copy({
      targets: [
        { src: 'manifest.json', dest: '/mnt/c/Users/Jesús/Documents/vault/.obsidian/plugins/obsidian-note-generator' },
        { src: 'styles.css', dest: '/mnt/c/Users/Jesús/Documents/vault/.obsidian/plugins/obsidian-note-generator' },
      ],
    }),
  ],
  external: ['obsidian'], // List any external dependencies here
};
