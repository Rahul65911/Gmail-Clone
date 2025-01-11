import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSentEmails } from "../redux/appSlice";

const useGetSentEmails = () => {
    const { user } = useSelector(store => store.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                console.log(user.email);
                const res = await axios.get(`https://gmail-clone-backend-jade.vercel.app/api/v1/email/getsentemails?emailId=${user?user.email:""}`, {
                    withCredentials: true,
                });
                if(!res.data) {
                    console.log("not fetched");
                } else {
                    dispatch(setSentEmails(res.data.emails));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmails();
    }, []);
}

export default useGetSentEmails;