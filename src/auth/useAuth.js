import { useContext } from "react";
import AuthContext from "./context";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { clear } from "../redux/cartSlice";
import { orderclear } from "../redux/orderSlice";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
const dispatch = useDispatch()
  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    localStorage.setItem("token", JSON.stringify(authToken));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    dispatch(orderclear())
    dispatch(clear())
  };

  return { user, logIn, logOut };
};

export default useAuth;
