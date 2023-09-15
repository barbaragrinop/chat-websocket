import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type Props = {
  searchKey: string;
  setSearchKey: (value: string) => void;
};

export function UserSearch({ searchKey, setSearchKey }: Props) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search users / chats"
        className="rounded-xl w-full h-12 border-gray-300 pl-10 text-gray-500"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <HiOutlineMagnifyingGlass className="ri-search-line absolute left-4 text-gray-500" />
    </div>
  );
}
