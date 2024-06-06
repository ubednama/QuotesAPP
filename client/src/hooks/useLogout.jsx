
import toast from "react-hot-toast";
import axios from "axios";
import useAuthContext from "./useAuthContext";
import { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true); //logout takes less then loading state, so we actually dont need this much
    try {
      const res = await axios.post("/api/v1/logout");
      const data = res.data

      console.log(data)

      if (!data || !data.success) {
        throw new Error(data.error);
      }

      localStorage.removeItem("token");
      toast.success("You are logged out successfully")
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;