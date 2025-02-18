import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import {
  MdInbox,
  MdOutlineWatchLater,
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setEmailType, setOpen } from "../redux/appSlice";

const Sidebar = ({ isOpen }) => {
  const [clicked, setClicked] = useState(null);
  const dispatch = useDispatch();

  const sentHandler = (e) => {
    dispatch(setEmailType(1));
    setClicked(3);
  };

  const inboxHandler = (e) => {
    dispatch(setEmailType(0));
    setClicked(0);
  };

  const sidebarItems = [
    {
      icon: <MdInbox size={"20px"} />,
      text: "Inbox",
      action: inboxHandler,
    },
    {
      icon: <IoMdStar size={"20px"} />,
      text: "Starred",
      action: null,
    },
    {
      icon: <MdOutlineWatchLater size={"20px"} />,
      text: "Snoozed",
      action: null,
    },
    {
      icon: <TbSend2 size={"20px"} />,
      text: "Sent",
      action: sentHandler,
    },
    {
      icon: <MdOutlineDrafts size={"20px"} />,
      text: "Drafts",
      action: null,
    },
    {
      icon: <MdOutlineKeyboardArrowDown size={"20px"} />,
      text: "more",
      action: null,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className={`bg-white h-[90vh] mt-2 shadow-md transition-all duration-300 max-md:z-10 rounded-e-lg`}
        >
          <div className="p-3">
            <button
              onClick={() => dispatch(setOpen(true))}
              className="flex items-center gap-3 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md"
            >
              <LuPencil size={"24px"} />
              Compose
            </button>
          </div>
          <div className="text-gray-600">
            {sidebarItems.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={item.action}
                  className={`flex items-center pl-6 py-1 my-2 rounded-r-full gap-4 cursor-pointer hover:bg-gray-200 ${
                    clicked == index ? "bg-blue-200" : ""
                  } `}
                >
                  {item.icon}
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
