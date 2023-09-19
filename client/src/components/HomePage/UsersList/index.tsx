import { User as UserType } from "@/types/user";
import { useSelector } from "react-redux";
import User from "./User";
import { RootState } from "@/redux/store";

type Props = {
  searchKey: string;
};

export default function UsersList({ searchKey }: Props) {
  const { allUsers, allChats, user } = useSelector(
    (state: RootState) => state.userReducer
  );

  function getData() {
    if (!searchKey) return allChats;
    return allUsers.filter((userObj: UserType) =>
      userObj.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col gap-3 min-w-full" key={searchKey}>
      {getData().map((chatObjOrUserObj: any) => {
        let userObj = chatObjOrUserObj;
        if (chatObjOrUserObj.members) {
          userObj = chatObjOrUserObj.members.find(
            (member: any) => member._id !== user._id
          );
        }
        return <User user={userObj} key={userObj.email + userObj.name} />;
      })}
    </div>
  );
}
