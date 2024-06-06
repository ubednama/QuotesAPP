import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import Avatar from "../User/Avatar";
import { FiLogOut } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { BsInputCursorText } from "react-icons/bs";

const LeftBar = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="border border-gray-600 rounded-xl mt-4 mx-6">
        <Link
          to="/"
          className="text-3xl size-fit hover:bg-gray-700 p-3 rounded-full cursor-pointer translate-all"
        >
          <FaQuoteLeft />
        </Link>
        <div className="mt-2 text-3xl xl:text-lg flex flex-col items-end gap-3 pr-4">
          <div>profile</div>
          <div>Home</div>
          <div>Search</div>
          <div>Likes</div>
          <div>Saved</div>
          <div>
            <BsInputCursorText />
          </div>
        </div>
      </div>

      <div className="text-3xl py-2">
        {!loading ? (
          <FiLogOut onClick={logout} />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
