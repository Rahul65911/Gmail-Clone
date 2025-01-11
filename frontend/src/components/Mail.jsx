import React from "react";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { BiArchiveIn } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import formatTimeAgo from "../hooks/useFormatedDate";

const Mail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { emails, sentEmails, emailType } = useSelector((store) => store.app);
  let email;
  if(emailType == 0) 
    email = emails.find(e => e._id == id);
  else  
    email = sentEmails.find(e => e._id == id);
  
  const deleteHandler = async (e) => {
    try {
      const res = await axios.delete(`https://gmail-clone-backend-jade.vercel.app/api/v1/email/${id}`,{
        withCredentials:true
      });
      toast.success(res.data.message);
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  
  const iconList = [
    { icon: <BiArchiveIn size={"20px"} />, action: null, key:1 },
    { icon: <MdOutlineReport size={"20px"} />, action: null, key:2 },
    { icon: <MdDeleteOutline size={"20px"} />, action: deleteHandler, key:3 },
    { icon: <MdOutlineMarkEmailUnread size={"20px"} />, action: null, key:4 },
    { icon: <MdOutlineWatchLater size={"20px"} />, action: null, key:5 },
    { icon: <MdOutlineAddTask size={"20px"} />, action: null, key:6 },
    { icon: <MdOutlineDriveFileMove size={"20px"} />, action: null, key:7 },
    { icon: <IoMdMore size={"20px"} />, action: null, key:8 },
  ];

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <IoMdArrowBack size={"20px"} />
          </div>
          {iconList.map((item) => {
            return (
              <div
                className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                key={item.key}
                onClick={item.action}
              >
                {item.icon}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"20px"} />
          <MdKeyboardArrowRight size={"20px"} />
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between gap-1 bg-white">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{email.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-400 text-sm my-5">
            <p>{formatTimeAgo(email.createdAt)}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>{emailType==0?email.from: "from me"}</h1>
          <span>{emailType==0?"to me": email.to}</span>
        </div>
        <div className="my-10">
          <p>{email.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
