import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [input, setInput] = useState({
    fullname:"",
    email:"",
    password:"",
  });
  
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setInput({...input, [event.target.name]:event.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8080/api/v1/user/register", input, {
        headers:{
          'Content-Type': "application/json",
        },
        withCredentials: true
      });
      
      if(res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }else {
        console.log(res.data);
      }
    }catch(err) {
      console.error(err);
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-screen mt-10'> 
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%] rounded-sm hover:shadow-md'>
            <h1 className='font-bold text-2xl my-1'>SIGNUP</h1>
            <input type="text" onChange={changeHandler} placeholder='Name' name='fullname' value={input.fullname} className='border border-gray-400 rounded-md px-2 py-1'/>
            <input type="email" onChange={changeHandler} placeholder='r@gmail.com' name='email' value={input.email} className='border border-gray-400 rounded-md px-2 py-1'/>
            <input type="password" onChange={changeHandler} placeholder='Password' name='password' value={input.password} className='border border-gray-400 rounded-md px-2 py-1'/>
            <button type='submit' className='bg-gray-800 p-2 rounded-md text-white'>Signup</button>
            <p>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup