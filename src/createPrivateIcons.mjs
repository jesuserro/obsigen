import fs from 'fs';

const dataUrls = {};
const iconsDir = 'src/assets/icons';

fs.mkdirSync(iconsDir, { recursive: true });

// Lee y convierte los archivos PNG en URLs de datos
const pngFiles = fs.readdirSync(iconsDir).sort();
pngFiles.forEach((file) => {
  if (file.endsWith('.png')) {
    const data = fs.readFileSync(`${iconsDir}/${file}`, 'base64');
    const dataUrl = `data:image/png;base64,${data}`;
    // Elimina la extensión .png de la clave en el objeto dataUrls
    const key = file.replace('.png', '');
    dataUrls[key] = dataUrl;
  }
});

// Guarda los datos en un archivo TypeScript
const tsCode = `const dataUrls: Record<string, string> = ${JSON.stringify(dataUrls, null, 2)};

export default dataUrls;
`;

fs.writeFileSync(`${iconsDir}/dataurls.ts`, tsCode);
