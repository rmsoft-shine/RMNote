import ContextMenu from "@/components/Common/ContextMenu";
import DeleteThis from "./Menu/DeleteThis";
import EditThis from "./Menu/EditThis";

export default function Menu({
  x,
  y,
  onClick,
  onModal,
}: {
  x: number;
  y: number;
  onClick: () => void;
  onModal: () => void;
}) {
  return (
    <ContextMenu x={x} y={y} onBlur={onClick}>
        <EditThis onModal={onModal}/>
        <DeleteThis offModal={onClick} />
    </ContextMenu>
  );
}
