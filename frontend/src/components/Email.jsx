import React, { useEffect, useState } from "react";
import { MdCropSquare, MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import formatTimeAgo from "../hooks/useFormatedDate";

const Email = ({ email }) => {
  const navigate = useNavigate();
  const openMail = () => {
    navigate(`/mail/${email._id}`);
  };

  const [shortText, setShortText] = useState(email?.message);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShortText(email?.message.slice(0, 5));
      } else if (window.innerWidth < 800) {
        setShortText(email?.message.slice(0,15));
      } else {
        setShortText(email?.message);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [email?.message]);

  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm cursor-pointer hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-300 hover:text-gray-950">
          <MdCropSquare size={"20px"} />
        </div>
        <div className="text-gray-300">
          <MdOutlineStarBorder size={"20px"} />
        </div>
        <div>
          <h1 className="font-semibold">{email?.subject}</h1>
        </div>
      </div>
      <div className="flex-1 ml-4 max-sm:text-xs">
        <p>{shortText} ...</p>
      </div>
      <div className="flex-none text-gray text-sm">
        <p>{formatTimeAgo(email?.createdAt)}</p>
      </div>
    </div>
  );
};

export default Email;
