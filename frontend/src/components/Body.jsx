import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Body = ({ isSidebarOpen }) => {
  const { user } = useSelector((store) => store.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex relative">
      <div
        className={`absolute md:relative transition-all duration-200 ${
          isSidebarOpen ? "w-48" : "w-0"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div
        className={`flex-1 transition-all duration-200`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
