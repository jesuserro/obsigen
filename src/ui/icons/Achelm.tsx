interface AchelmProps {
  size: number;
  className?: string;
}

function Achelm({ size, className }: AchelmProps) {

  const dataUrl = require('./../../assets/icons/dataurls.json')['Achelm.png'];

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
