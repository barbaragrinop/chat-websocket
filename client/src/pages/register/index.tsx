import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/loader-slice";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const register = async (ev: FormEvent) => {
    ev.preventDefault();
    try {
      dispatch(showLoader());
      const response = await registerUser(user);
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5">
        <h1 className="text-4xl uppercase font-semibold">Chat Register</h1>
        <hr />
        <input
          type="text"
          value={user.name}
          placeholder="name"
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          value={user.email}
          placeholder="email"
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          value={user.password}
          placeholder="password"
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />

        <button className="contained-btn" onClick={register}>
          Register
        </button>

        <Link to="/login" className="underline">
          Already have an account? Sign in!
        </Link>
      </div>
    </div>
  );
}
