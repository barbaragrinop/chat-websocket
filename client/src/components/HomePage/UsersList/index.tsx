import { User as UserType } from "@/types/user";
import { useSelector } from "react-redux";
import User from "./User";
import { Chat } from "@/types/chat";

type Props = {
  searchKey: string;
};

export default function UsersList({ searchKey }: Props) {
  const { allUsers, allChats } = useSelector((state: any) => state.userReducer);

  function getData() {
    return allUsers.filter(
      (userObj: UserType) =>
        (userObj.name.toLowerCase().includes(searchKey.toLowerCase()) &&
          searchKey) ||
        allChats.some((chat: Chat) =>
          chat.members.map((member) => member._id).includes(userObj._id)
        )
    );
  }

  return (
    <div className="flex flex-col gap-3 min-w-full" key={searchKey}>
      {getData().map((userObj: UserType) => (
        <User user={userObj} key={userObj.email + userObj.name} />
      ))}
    </div>
  );
}
