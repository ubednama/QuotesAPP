// useGetAllQuotes.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllQuotes = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/quotes");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setQuotes(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuotes();
  }, []);

  return { loading, quotes };
};

export default useGetAllQuotes;