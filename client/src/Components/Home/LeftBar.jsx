import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { BsInputCursorText } from "react-icons/bs";
import Avvvatars from "avvvatars-react";
import useAuthContext from "../../hooks/useAuthContext";
// import { useEffect } from "react";

const LeftBar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  // useEffect(() => {
  //   console.log("Auth User in UserProfile:", authUser);
  //   if (authUser) {
  //     console.log("authUser.fullName:", authUser.fullName);
  //   }
  // }, [authUser]);

  // if (!authUser) {
  //   return <div>No user logged in</div>;
  // }

  return (
    <div className="flex flex-col justify-between h-screen mr-8">
      <div>
        <div className="border border-gray-600 rounded-xl mt-4 py-4 pl-3">
          <Link
            to="/"
            className="text-3xl hover:bg-gray-700 size-fit rounded-full cursor-pointer translate-all"
          >
            <FaQuoteLeft />
          </Link>
          <div className="mt-2 text-3xl xl:text-lg flex flex-col items-end pr-2">
            <Link
              to="/profile"
              className="hover:bg-gray-700 rounded-full cursor-pointer px-3 py-1"
            >
              Profile
            </Link>
            <Link
              to="/"
              className="hover:bg-gray-700 rounded-full cursor-pointer px-3 py-1"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="hover:bg-gray-700 rounded-full cursor-pointer px-3 py-1"
            >
              Search
            </Link>
            <Link
              to="/likes"
              className="hover:bg-gray-700 rounded-full cursor-pointer px-3 py-1"
            >
              Likes
            </Link>
            <Link
              to="saved"
              className="hover:bg-gray-700 rounded-full cursor-pointer px-3 py-1"
            >
              Saved
            </Link>
          </div>
        </div>
        <div className="border rounded-xl mt-2 border-gray-700 hover:bg-gray-700 cursor-pointer">
          <div className="flex gap-2 items-center text-4xl size-fit  p-3 rounded-full  translate-all">
            <BsInputCursorText /> <span className="text-2xl">Post</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4 border border-gray-600 p-2 rounded-xl">
        <div className=" flex gap-1 items-center">
          <div>
            {authUser?.profileImageURL ? (
              <img src={authUser.profileImageURL}></img>
            ) : (
              <Avvvatars value={authUser?.fullName} size={35} />
            )}
          </div>
          <div>
            <div>{authUser.fullName}</div>
            <div className="text-sm !mt-0 !pt-0">
              {authUser?.knownFor || authUser?.email}
            </div>
          </div>
        </div>
        <div className="text-2xl py-2 ">
          {!loading ? (
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={logout}
            >
              <FiLogOut /> <span className="text-xl">Logout</span>
            </div>
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
