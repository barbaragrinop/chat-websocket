import { User as UserType } from "@/types/user";
import { useSelector } from "react-redux";
import User from "./User";

type Props = {
  searchKey: string;
};

export default function UsersList({ searchKey }: Props) {
  const { allUsers } = useSelector((state: any) => state.userReducer);

  return (
    <div className="flex flex-col gap-3 ">
      {allUsers
        .filter((user: UserType) =>
          user.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        .map((user: UserType) => (
          <User user={user} />
        ))}
    </div>
  );
}
