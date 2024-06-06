import useLogout from "../../hooks/useLogout";
import Avatar from "../User/Avatar"
import { FiLogOut } from "react-icons/fi";

const LeftBar = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="border cursor-pointer">
      <div>
        {!loading ? (<FiLogOut onClick={logout} />) : (
            <span className='loading loading-spinner'></span>
      )}</div>
    </div>
  );
}

export default LeftBar
