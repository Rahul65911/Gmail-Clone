import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSentEmails } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";

const SERVER = import.meta.env.VITE_SERVER;

const SendEmail = () => {
  const { open, user, sentEmails } = useSelector(store => store.app);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    from:"",
    to:"",
    subject:"",
    message:""
  });

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value, from:user.email});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${SERVER}/api/v1/email/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      dispatch(setSentEmails([...sentEmails, res.data.email]));
      toast.success("Email Sent");
    } catch(err) {
      console.error(err);
      toast.error(err.response?.data?.message)
    }

    dispatch(setOpen(false));
  }

  return (
    <div className={` ${open? 'block': 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[#F2F6FC]">
        <h1>New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className="p-2 rounded-full hover:bg-gray-300 cursor-pointer">
          <RxCross2 size={"20px"} />
        </div>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
        <input onChange={changeHandler} name="to" value={formData.to} type="text" placeholder="To" className="outline-none py-1" />
        <input
          onChange={changeHandler}
          name="subject" value={formData.subject}
          type="text"
          placeholder="Subject"
          className="outline-none py-1"
        />
        <textarea
          onChange={changeHandler}
          name="message" value={formData.message}
          rows={"10"}
          cols={"30"}
          className="outline-none py-1 "
        ></textarea>
        <button className="bg-blue-500 rounded-full px-5 py-1 w-fit text-white">Send</button>
      </form>
    </div>
  );
};

export default SendEmail;
