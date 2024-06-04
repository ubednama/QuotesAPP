import axios from "axios";
import toast from "react-hot-toast";

const useFetchQuotes = () => {
  const fetchQuotes = async ({ pageParam = 1 }) => {
    try {
      const res = await axios.get(`/api/v1/quotes?page=${pageParam}`);
      const data = res.data;
      console.log(data)
      if (Object.keys(data.error).length>0) {
        throw new Error(Object.keys(data.error).length>0);
      }

      console.log(data.data.totalQuotes);
      const quotes = data.data.quotes;
      const hasNextPage = quotes.length > 0;
      return {
        quotes,
        hasNextPage
      };
    } catch (error) {
        console.log("error while fetching",error)
      toast.error(error.message);
      return {
        quotes: [],
        hasNextPage: false,
      };
    }
  };

  return fetchQuotes;
};

export default useFetchQuotes;