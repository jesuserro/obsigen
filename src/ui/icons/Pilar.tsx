import dataUrls from '../../assets/icons/dataurls';

interface PilarProps {
  size: number;
  className?: string;
}

function Pilar({ size, className }: PilarProps) {
  
  // const dataUrls = require('./../../assets/icons/dataurls');
  const dataUrl = dataUrls['Pilar']; 

  return (
    <img
      src={dataUrl}
      alt="Pilar"
      width={size}
      height={size}
      className={className}
    />
  );
}


export default Pilar;

