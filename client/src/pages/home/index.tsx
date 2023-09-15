import { ChatPanel } from "@/components/HomePage/ChatPanel";
import { UserSearch } from "@/components/HomePage/UserSearch";
import UsersList from "@/components/HomePage/UsersList";
import { useState } from "react";

function Home() {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="flex gap-5">
      <div className="w-96 flex flex-col gap-4  rounded-xl">
        <UserSearch setSearchKey={setSearchKey} searchKey={searchKey} />
        <UsersList searchKey={searchKey} />
      </div>
      <div>
        <ChatPanel />
      </div>
    </div>
  );
}

export default Home;
