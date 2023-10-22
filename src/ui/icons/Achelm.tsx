
interface AchelmProps {
  size: number;
  className?: string;
}

function Achelm({ size, className }: AchelmProps) {

  const src = require('./../../assets/icons/Achelm.png');

  return (
    <img
      src={src}
      alt="Achelm"
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Achelm;