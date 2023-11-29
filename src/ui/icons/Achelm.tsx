import dataUrls from '../../assets/icons/dataurls';
import { iconInterface } from './../iconInterface';

function Achelm({ iconName, size, className }: iconInterface) {
  
  const dataUrl = dataUrls['Achelm']; 

  return (
    <img
      src={dataUrl}
      alt={iconName}
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Achelm;

