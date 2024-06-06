import Avatar from "../User/Avatar";
import useFetchUsers from "../../hooks/useFetchUsers";

const RightBar = () => {
  const { data, fetchData, hasMore } = useFetchUsers();

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
    <div className="mt-3 ml-6 lg:ml-8 flex flex-col gap-8 lg:gap-10">
      <div className="w-full border-[1px] border-gray-600 rounded-lg">
        <div className="w-full sm:px-2 xl:px-5 border-gray-200 dark:border-gray-800 pt-5 border-b-2 max-w-xl flex justify-between text-lg items-end">
          <div className="font-bold">Personalities</div>
          <div className="text-xs pb-1 text-blue-400 cursor-pointer">
            {hasMore && (
              <button onClick={handleShowMorePersonalities}>Show More</button>
            )}
          </div>
        </div>
        <div className="flex h-fit overflow-x-auto gap-4 pt-4 px-2">
          {data.personalities.map((personality, index) => (
            <Avatar key={index} user={personality} />
          ))}
        </div>
      </div>

      <div className="w-full border-[1px] border-gray-600 rounded-lg">
        <div className="w-full sm:px-2 xl:px-5 border-gray-200 dark:border-gray-800 pt-5 border-b-2 max-w-xl flex justify-between text-lg items-end">
          <div className="font-bold">Users</div>
          <div className="text-xs pb-1 text-blue-400 cursor-pointer">
            {hasMore && (
              <button onClick={handleShowMoreUsers}>Show More</button>
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
