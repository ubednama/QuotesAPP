import Avatar from "../User/Avatar";
import useFetchUsers from "../../hooks/useFetchUsers";

const RightBar = () => {
  const { data, fetchData, loading, hasMore } = useFetchUsers();

  const handleShowMoreUsers = () => {
    if (hasMore) {
      fetchData("users", data.page);
    }
  };

  const handleShowMorePersonalities = () => {
    if (hasMore) {
      fetchData("personalities", data.page);
    }
  };

  return (
    <div>
      <div className="w-full border-b-[1px] border-gray-600">
        <div className="w-full sm:px-5 xl:px-10 border-gray-200 dark:border-gray-800 pt-5 border-b-2 max-w-xl flex justify-between text-lg items-end">
          <div>Personalities</div>
          <div className="text-xs pb-2 text-blue-400 cursor-pointer">
            {hasMore && (
              <button onClick={handleShowMorePersonalities} disabled={loading}>
                {loading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        </div>
        <div className="flex h-fit overflow-x-auto gap-4 pt-4 px-2">
          {data.personalities.map((personality, index) => (
            <Avatar key={index} user={personality} />
          ))}
        </div>
      </div>

      <div className="w-full border-b-[1px] border-gray-600">
        <div className="w-full sm:px-5 xl:px-10 border-gray-200 dark:border-gray-800 pt-5 border-b-2 max-w-xl flex justify-between text-lg items-end">
          <div>Users</div>
          <div className="text-xs pb-2 text-blue-400 cursor-pointer">
            {hasMore && (
              <button onClick={handleShowMoreUsers} disabled={loading}>
                {loading ? "Loading..." : "Show More"}
              </button>
            )}
          </div>
        </div>
        <div className="flex h-fit overflow-x-auto gap-4 pt-4 px-2">
          {data.users.map((user, index) => (
            <Avatar key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
