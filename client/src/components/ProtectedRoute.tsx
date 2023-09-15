import { User } from "@/types/user";
import { getAllUsers, getCurrentUser } from "../api/users";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "@/redux/loader-slice";
import { setAllUsers, setUser } from "@/redux/users-slice";
import { TbLogout } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";

export default function ProtectedRoute(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer);

  async function getLoggedUser() {
    try {
      dispatch(showLoader());
      const response = await getCurrentUser();
      const allUsersResponse = await getAllUsers();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
        dispatch(setAllUsers(allUsersResponse.data));
        return true;
      } else {
        navigate("/login");
        toast.error(response.message);
      }
    } catch (error: any) {
      dispatch(hideLoader());

      toast.error(error.message);
      navigate("/login");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getLoggedUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      {/* header */}
      <div className="flex justify-between p-5 bg-primary rounded">
        <div className="flex items-center gap-1">
          <h1
            className="text-white text-2xl uppercase font-bold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Chat
          </h1>
        </div>
        <div className="flex gap-2 justify-between text-md items-center bg-white p-2 rounded">
          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <FaRegUserCircle className="ri-shield-user-line text-primary" />
          )}
          <h1
            className="underline text-primary cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.name}
          </h1>

          <TbLogout
            className="text-xl cursor-pointer text-primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>

      {/* content (pages) */}
      <div className="py-5">{props.children}</div>
    </div>
  );
}
