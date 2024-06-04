import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("token") || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};