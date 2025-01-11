import React, { useEffect, useState } from "react";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdRefresh, IoMdMore } from "react-icons/io";
import { GoTag } from "react-icons/go";
import Emails from "./Emails";
import useGetAllEmails from "../hooks/useGetAllEmails";
import useGetSentEmails from "../hooks/useGetSentEmails";

const mailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"20px"} />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size={"20px"} />,
    text: "Social",
  },
];

const Inbox = () => {
  const [selected, setSelected] = useState(0);
  console.log("hd");
  useGetSentEmails();
  useGetAllEmails();
  
  return (
    <div className="h-[90vh] flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className="p-2 rounded-full cursor-pointer hover:bg-gray-200">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full cursor-pointer hover:bg-gray-200">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"20px"} />
          <MdKeyboardArrowRight size={"20px"} />
        </div>
      </div>
      <div className="h-90vh overflow-y-auto">
        <div className="flex items-center gap-1">
          {mailType.map((item, index) => {
            return (
              <button
                key={item.text}
                onClick={() => setSelected(index)}
                className={` ${
                  selected === index
                    ? "border-b-4 border-b-blue-600 text-blue-600"
                    : "border-b-4 border-b-transparent"
                } flex items-center gap-5 p-4 w-52 hover:bg-gray-100`}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
        <Emails />
      </div>
    </div>
  );
};

export default Inbox;
