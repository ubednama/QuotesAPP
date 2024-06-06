import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useFetchUsers = () => {
  const [data, setData] = useState({ users: [], personalities: [] });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (selectedOption, pageParam = 1) => {
    setLoading(true);
    try {
      let url;
      if (selectedOption === "users") {
        url = `/api/v1/users/?limit=10&page=${pageParam}`;
      } else if (selectedOption === "personalities") {
        url = `/api/v1/personalities/?limit=10&page=${pageParam}`;
      } else {
        url = ``;
      }

      const res = await axios.get(url);
      const result = res.data.data;
      const newItems =
        selectedOption === "users" ? result.users : result.personalities;

      setData((prevData) => ({
        ...prevData,
        [selectedOption]:
          pageParam === 1
            ? newItems
            : [...prevData[selectedOption], ...newItems],
      }));

      setHasMore(newItems.length > 0);
      setPage(pageParam + 1);
    } catch (error) {
        console.log("Error fetching users",error)
      toast.error(error.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData("users", 1);
    fetchData("personalities", 1);
  }, [fetchData]);

  return { data, fetchData, loading, hasMore, page };
};

export default useFetchUsers;
