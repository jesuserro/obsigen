import dataUrls from '../assets/icons/dataurls';
import { CustomIconInterface } from './CustomIconInterface';

function CustomIcon({ size, className, iconName }: CustomIconInterface) {
  const dataUrl = dataUrls[iconName];

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

export default CustomIcon;
