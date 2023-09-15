import React, { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const login = async (ev: FormEvent) => {
    ev.preventDefault();
    try {
      const response = await loginUser(user);
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        console.log("login deu certo");
        console.log(
          '${localStorage.getItem("token")}',
          localStorage.getItem("token")
        );

        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5">
        <h1 className="text-4xl uppercase font-semibold">Chat Login</h1>
        <hr />

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

        <button className="contained-btn" onClick={login}>
          Login
        </button>

        <Link to="/register" className="underline">
          Don't have an account yet? Sign up!
        </Link>
      </div>
    </div>
  );
}

export default Login;
