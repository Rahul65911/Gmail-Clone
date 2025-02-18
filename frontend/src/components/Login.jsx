import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/appSlice";

const SERVER = import.meta.env.VITE_SERVER;

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${SERVER}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen mt-10">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 bg-white p-4 max-xs:w-[60%] rounded-sm hover:shadow-md"
      >
        <h1 className="font-bold text-2xl my-1">LOGIN</h1>
        <input
          type="email"
          onChange={changeHandler}
          placeholder="r@gmail.com"
          name="email"
          value={input.email}
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          type="password"
          onChange={changeHandler}
          placeholder="Password"
          name="password"
          value={input.password}
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <button type="submit" className="bg-gray-800 p-2 rounded-md text-white">
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
