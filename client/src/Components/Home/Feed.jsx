import { useInfiniteQuery } from "@tanstack/react-query";
// import useGetAllQuotes from "../../hooks/useGetAllQoutes";
import { useInView } from "react-intersection-observer";
import CardComponent from "../User/Card";
import useFetchQuotes from "../../hooks/useFetchQuotes";
import { useEffect } from "react";

const Feed = () => {
  const fetchQuotes = useFetchQuotes();

  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.hasNextPage ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const {ref, inView} = useInView();

  useEffect(()=> {
    if(inView && !isFetchingNextPage) {
      const totalQuotes = data.pages[data.pages.length - 1].totalQuotes;
      fetchNextPage(totalQuotes);
    }
  })
  if (data) console.log(data);
  return (
    <div className="flex flex-col items-center w-full">
      <div>
      {status === "pending" ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : status === "error" ? (
        <div>{error.message}</div>
      ) : (
        <div>
          {data.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              <div key={page.currentPage}>
                {page.quotes.map((quote, idx) => (
                  <CardComponent key={idx} quote={quote} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      <div ref={ref}>{isFetchingNextPage && <span className="loading loading-spinner mx-auto"></span>}</div>
    </div>
  );
};

export default Feed;
