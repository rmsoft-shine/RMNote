export default function ButtonIcon({
  icon,
  className,
  ...props
}: {
  icon: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`p-1 ${className ?? ""}`} {...props}>
      <span className="material-icons align-top">{icon}</span>
    </button>
  );
}
