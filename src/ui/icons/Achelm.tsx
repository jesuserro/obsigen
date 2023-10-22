
interface AchelmProps {
  size: number;
  className?: string;
}

import dataUrls from './../../assets/icons/dataurls.json'; // Importa el archivo JSON

function Achelm({ size, className }: AchelmProps) {
  const dataUrl = dataUrls['Achelm']; // Accede al dato del archivo JSON

  return (
    <img
      src={dataUrl}
      alt="Achelm"
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Achelm;

