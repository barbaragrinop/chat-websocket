import { ChatPanel } from "@/components/HomePage/ChatPanel";
import { UserSearch } from "@/components/HomePage/UserSearch";
import UsersList from "@/components/HomePage/UsersList";
import { useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [searchKey, setSearchKey] = useState("");
  const { selectedChat } = useSelector((state: any) => state.userReducer);

  return (
    <div className="flex gap-5">
      <div className="min-w-96 flex flex-col gap-4  rounded-xl">
        <UserSearch setSearchKey={setSearchKey} searchKey={searchKey} />
        <UsersList searchKey={searchKey} />
      </div>

      <div className="w-[calc(100vw_-_384px)]">
        {selectedChat.members ? <ChatPanel /> : <></>}
      </div>
    </div>
  );
}

export default Home;
