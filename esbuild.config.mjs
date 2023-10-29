import builtins from "builtin-modules";
import esbuild from "esbuild";
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';
import process from "process";

const banner =
  `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the GitHub repository of this plugin
*/
`;

const prod = (process.argv[2] === "production");
const outputDir = "/mnt/c/Users/Jesús/Documents/vault/.obsidian/plugins/obsigen";

// scss compilados ya desde package.json, lo sacamos de esbuild
// const entryPoints = glob.sync("src/**/*.*").filter((file) => file !== "src/styles.scss");
// const entryPoints = glob.sync("src/assets/icons/dataurls.ts");

const context = await esbuild.context({
  banner: {
    js: banner,
  },
  entryPoints: ["src/main.ts"],
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
    // 'src/assets/icons/dataurls.json', // Excluye el archivo dataurls.json
    './src/assets/icons/*.png', // Excluye archivos .png
    // 'src/createPrivateIcons.mjs',   // Excluye el archivo
    ...builtins
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: `${outputDir}/main.js`,
  // outdir: `${outputDir}`,
  plugins: [
    copy({
      assets: [
        { from: 'manifest.json', to: `${outputDir}/manifest.json` }, // Copiamos manifest.json a la carpeta de salida
        { from: 'src/styles.css', to: `${outputDir}/styles.css` }, // Copiamos styles.css a la carpeta de salida
      ],
    }),
    sassPlugin()
  ],
  loader: {
    '.svg': 'file',
    // '.png': 'dataurl',
    // '.json': 'file', // Agrega esta línea para excluir archivos .json de la compilación
    // '.scss': sass()
  },
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
