import fs from 'fs';

const privateDataUrls = {};

// Lee y convierte los archivos PNG en URLs de datos
const pngFiles = fs.readdirSync('src/assets/icons');
pngFiles.forEach((file) => {
  if (file.endsWith('.png')) {
    const data = fs.readFileSync(`src/assets/icons/${file}`, 'base64');
    const dataUrl = `data:image/png;base64,${data}`;
    // Elimina la extensión .png de la clave en el objeto privateDataUrls
    const key = file.replace('.png', '');
    privateDataUrls[key] = dataUrl;
  }
});

// Guarda los datos en un archivo JSON
fs.writeFileSync('src/assets/icons/dataurls.json', JSON.stringify(privateDataUrls));

export default privateDataUrls;
