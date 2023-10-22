import dataUrls from './../../assets/icons/dataurls.json';

interface AchelmProps {
  size: number;
  className?: string;
}

function Achelm({ size, className }: AchelmProps) {
  const dataUrl = dataUrls['Achelm']; 

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

