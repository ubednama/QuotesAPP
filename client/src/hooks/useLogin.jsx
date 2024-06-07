import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import useAuthContext from "./useAuthContext";
// import { API_END_POINT } from "../utils/constant";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post(`/api/v1/login`, { email, password });
      console.log("data ", res.data)

      const data = res.data;
      
      if (!data || !data.success) {
        throw new Error(data ? data.error : "Request failed");
      }

      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success(data.message)
      console.log(data.data.user)
      setAuthUser(data.data.user);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error.desc)
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors({
  email,
  password,
}) {
  if (!email || !password) {
    toast.error("Please fill all fields");
    return false;
  }

  return true;
}