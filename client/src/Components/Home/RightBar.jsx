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
      <div>
        <h2>Personalities</h2>
        <div className="flex h-fit overflow-x-auto hover:overflow-x-scroll gap-4 py-4 px-2">
          {data.personalities.map((personality, index) => (
            <Avatar key={index} user={personality} />
          ))}
        </div>
        {hasMore && (
          <button onClick={handleShowMorePersonalities} disabled={loading}>
            {loading ? "Loading..." : "Show More"}
          </button>
        )}
      </div>

      <div>
        <h2>Users</h2>
        <div className="flex h-fit overflow-x-auto hover:overflow-x-scroll">
          {data.users.map((user, index) => (
            <Avatar key={index} user={user} />
          ))}
        </div>
        {hasMore && (
          <button onClick={handleShowMoreUsers} disabled={loading}>
            {loading ? "Loading..." : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RightBar;
