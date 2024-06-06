import { useInfiniteQuery } from "@tanstack/react-query";
// import useGetAllQuotes from "../../hooks/useGetAllQoutes";
import { useInView } from "react-intersection-observer";
import CardComponent from "../User/Card";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import { useEffect, useState } from "react";

const Feed = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const fetchQuotes = useFetchQuotes();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["quotes", selectedOption],
      queryFn: ({ pageParam }) => fetchQuotes(selectedOption, { pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.hasNextPage ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  console.log(error, status);
  if (data) console.log(data);

  return (
    <div className="flex flex-col items-center w-full bg-black">
      <div className="w-full border-b-[1px] border-gray-600">
        <nav className="w-full sm:px-5 xl:px-10 border-gray-200 dark:border-gray-800 pt-5 border-b-2 max-w-xl flex justify-between">
          <button
            className={`mr-2 border-b-4 rounded-sm ${
              selectedOption === "" ? "border-blue-500" : "border-black"
            }`}
            onClick={() => handleOptionChange("")}
          >
            All Quotes
          </button>
          <button
            className={`mx-2 border-b-4 rounded-sm ${
              selectedOption === "users" ? "border-blue-500" : "border-black"
            }`}
            onClick={() => handleOptionChange("users")}
          >
            User Quotes
          </button>
          <button
            className={`ml-2 border-b-4 rounded-sm ${selectedOption === "personalities" ? "border-blue-500" : "border-black"}`}
            onClick={() => handleOptionChange("personalities")}
          >
            Personality Quotes
          </button>
        </nav>
      </div>
      <div className="">
        {status === "pending" ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : status === "error" ? (
          <div>{error.response.data.message}</div>
        ) : (
          <div>
            {data.pages[0].quotes.length > 0 ? (
              data.pages?.map((page, pageIndex) => (
                <div key={pageIndex}>
                  <div key={page.currentPage}>
                    {page.quotes.map((quote, idx) => (
                      <CardComponent key={idx} quote={quote} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="pt-4">Nothing to display</div>
            )}
          </div>
        )}
      </div>
      <div ref={ref}>
        {isFetchingNextPage && (
          <span className="loading loading-spinner mx-auto"></span>
        )}
      </div>
    </div>
  );
};

export default Feed;
