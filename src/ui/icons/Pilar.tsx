import dataUrls from '../../assets/icons/dataurls';
import { iconInterface } from './../iconInterface';

function Pilar({ size, className }: iconInterface) {
  
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

