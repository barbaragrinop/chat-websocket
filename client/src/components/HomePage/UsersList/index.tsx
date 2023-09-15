import { User as UserType } from "@/types/user";
import { useSelector } from "react-redux";
import User from "./User";

type Props = {
  searchKey: string;
};

export default function UsersList({ searchKey }: Props) {
  const { allUsers, allChats, user } = useSelector(
    (state: any) => state.userReducer
  );

  return (
    <div className="flex flex-col gap-3 " key={searchKey}>
      {allUsers
        .filter(
          (userObj: UserType) =>
            userObj.name.toLowerCase().includes(searchKey.toLowerCase()) &&
            searchKey
        )
        .map((userObj: UserType) => (
          <>
            <User user={userObj} key={userObj.email + userObj.name} />
          </>
        ))}
    </div>
  );
}
