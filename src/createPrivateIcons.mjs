import fs from 'fs';

const dataUrls = {};

// Lee y convierte los archivos PNG en URLs de datos
const pngFiles = fs.readdirSync('src/assets/icons');
pngFiles.forEach((file) => {
  if (file.endsWith('.png')) {
    const data = fs.readFileSync(`src/assets/icons/${file}`, 'base64');
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

fs.writeFileSync('src/assets/icons/dataurls.ts', tsCode);
