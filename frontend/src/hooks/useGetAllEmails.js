import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const useGetAllEmails = () => {
    const { user } = useSelector(store => store.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get(`${SERVER}/api/v1/email/getallemails?emailId=${user?user.email:""}`, {
                    withCredentials: true,
                });
                if(!res.data) {
                    console.log("not fetched");
                } else {
                    dispatch(setEmails(res.data.emails));
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message);
                navigate('/login');
            }
        }
        fetchEmails();
    }, []);
}

export default useGetAllEmails;