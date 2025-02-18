import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const SERVER = import.meta.env.VITE_SERVER;

const Navbar = ({ handleIsSidebarOpen, isSidebarOpen }) => {
  const { user } = useSelector((store) => store.app);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const myRef = useRef();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${SERVER}/api/v1/user/logout`);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  }

  const handleOpen = e => {
    if(!myRef.current?.contains(e.target)) setTimeout(() => setOpen(false), 100);
  }

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOpen);

    return () => document.removeEventListener('mousedown', handleOpen);
  }, []);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <button className="p-3 hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => handleIsSidebarOpen(!isSidebarOpen)}>
            <RxHamburgerMenu />
          </button>
          <img src={Logo} alt="logo" className="w-8 max-sm:hidden" />
          <h1 className="text-2xl text-gray-500 font-medium max-md:hidden">Gmail</h1>
        </div>
      </div>
      {user && (
        <>
          <div className="w-[50%]">
            <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
              <IoIosSearch size={"24px"} className="text-gray-700" />
              <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Search Mail"
                className="rounded-full w-full bg-transparent outline-none px-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer max-xs:hidden">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer max-xs:hidden">
              <IoIosSettings size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>
            <div>
              <div
                onClick={() => setOpen(prev => !prev)}
                className="cursor-pointer"
                ref={myRef}
              >
                <Avatar src={user.profilePhoto} size="35" round={true} />
              </div>
              {open && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 w-60 z-10">
                  <h3 className="text-gray-700 font-medium">{user.fullname}</h3>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md w-full text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;