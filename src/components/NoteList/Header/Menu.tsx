import DeleteThis from "./Menu/DeleteThis";
import EditThis from "./Menu/EditThis";

export default function Menu({
  x,
  y,
  onClick,
  onModal,
  children
}: {
  x: number;
  y: number;
  onClick: () => void;
  onModal: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-screen h-screen fixed left-0 top-0 z-50"
      onClick={onClick}
    >
      <ul
        style={{ top: y + 10, left: x + 10 }}
        className={`absolute drop-shadow-2xl bg-white border rounded py-4 m-0 w-max`}
      >
        <EditThis onModal={onModal}/>
        <DeleteThis offModal={onClick} />
        {children}
      </ul>
    </div>
  );
}
