import axios from "axios";
import toast from "react-hot-toast";

const useFetchQuotes = () => {
  const fetchQuotes = async (selectedOption, { pageParam = 1 }) => {
    try {
      let url;
      if (selectedOption === "users") {
        url = `/users`;
      } else if (selectedOption === "personalities") {
        url = `/personalities`;
      } else {
        url = ``;
      }

      const res = await axios.get(`/api/v1/quotes${url}?page=${pageParam}`);
      console.log(res)
      const data = res.data;

      console.log(data.data.totalQuotes);
      const quotes = data.data.quotes;
      const hasNextPage = quotes.length > 0;
      
      return {
        quotes,
        hasNextPage
      };
    } catch (error) {
      console.log("error while fetching",error)
      toast.error(error.response.data.message);
      return {
        quotes: [],
        hasNextPage: false,
      };
    }
  };

  return fetchQuotes;
};

export default useFetchQuotes;