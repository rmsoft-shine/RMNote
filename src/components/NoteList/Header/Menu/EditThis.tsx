export default function EditThis({ onModal }: { onModal: () => void }) {

  return (
    <li className="hover:bg-gray-200 py-1 px-6 cursor-pointer">
      <button onClick={onModal}>
        이 노트북 수정하기
      </button>
    </li>
  )
}
