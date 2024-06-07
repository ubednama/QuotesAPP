import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

export const AuthContextProvider = ({ children }) => {
  const getUserInfoFromLocalStorage = () => {
    try {
      const userInfo = localStorage.getItem("user");
      console.log("Retrieved user info from local storage:", userInfo);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      return null;
    }
  };

  const [authUser, setAuthUser] = useState(getUserInfoFromLocalStorage())

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};