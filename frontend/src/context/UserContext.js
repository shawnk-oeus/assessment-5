import { createContext } from "react";

const defaultValue = {
  isLoggedIn: false,
  user: null,
  userProfile: null,
  token: null,
};

const UserContext = createContext(defaultValue);

export default UserContext;