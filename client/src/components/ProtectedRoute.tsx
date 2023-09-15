import { User } from "@/types/user";
import { getCurrentUser } from "../api/users";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props: any) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);

  async function getLoggedUser() {
    console.log(
      '${localStorage.getItem("token")}',
      localStorage.getItem("token")
    );

    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
        return true;
      } else {
        navigate("/login");
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedUser();
    }
  }, []);

  return (
    <>
      <span>{user.name}</span>
      {props.children}
    </>
  );
}
