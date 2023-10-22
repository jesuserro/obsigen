import dataUrls from '../../assets/icons/dataurls';

interface AchelmProps {
  size: number;
  className?: string;
}

function Achelm({ size, className }: AchelmProps) {
  
  // const dataUrls = require('./../../assets/icons/dataurls');
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

