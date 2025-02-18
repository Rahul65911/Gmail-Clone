import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSentEmails } from "../redux/appSlice";
import toast from "react-hot-toast";

const SERVER = import.meta.env.VITE_SERVER;

const useGetSentEmails = () => {
    const { user } = useSelector(store => store.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get(`${SERVER}/api/v1/email/getsentemails?emailId=${user?user.email:""}`, {
                    withCredentials: true,
                });
                if(!res.data) {
                    console.log("not fetched");
                } else {
                    dispatch(setSentEmails(res.data.emails));
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message);
            }
        }
        fetchEmails();
    }, []);
}

export default useGetSentEmails;