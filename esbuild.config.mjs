import builtins from "builtin-modules";
import esbuild from "esbuild";
import { copy } from 'esbuild-plugin-copy';
import glob from 'glob';
import process from "process";

const banner =
  `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the GitHub repository of this plugin
*/
`;

const prod = (process.argv[2] === "production");
const outputDir = "/mnt/c/Users/Jesús/Documents/vault/.obsidian/plugins/obsidian-note-generator";

const entryPoints = glob.sync("src/**/*.*");


const context = await esbuild.context({
  banner: {
    js: banner,
  },
  entryPoints: [...entryPoints, "main.ts", "styles.css"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outdir: `${outputDir}`,
  plugins: [
    copy({
      assets: [
        { from: 'manifest.json', to: `${outputDir}/manifest.json` },
        { from: 'styles.css', to: `${outputDir}/styles.css` }
      ]
    })
  ]
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
