import ButtonIcon from "./Common/Buttonicon";
import NewNote from "./Header/NewNote";

export default function Header() {
  return (
    <header className="h-header sticky flex justify-between items-center py-1 px-4 border-b border-stone-300">
      <div className="flex items-center gap-1">
        <ButtonIcon icon="menu" />
        <ButtonIcon icon="arrow_back_ios_new" />
        <ButtonIcon icon="arrow_forward_ios" />
        <div className="flex bg-white rounded ml-1 px-2 border">
          <ButtonIcon icon="search" />
          <input
            className="focus:outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <NewNote />
        <ButtonIcon icon="content_copy" />
        <ButtonIcon icon="settings" />
      </div>
    </header>
  );
}
