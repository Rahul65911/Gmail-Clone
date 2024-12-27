import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
    const { user } = useSelector(store => store.app);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/email/getallemails?emailId=${user?user.email:""}`, {
                    withCredentials: true,
                });
                if(!res.data) {
                    console.log("not fetched");
                } else {
                    dispatch(setEmails(res.data.emails));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmails();
    }, []);
}

export default useGetAllEmails;