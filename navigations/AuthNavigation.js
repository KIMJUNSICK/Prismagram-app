import { createAppContainer, createStackNavigator } from "react-navigation";
import AuthHome from "../screens/Auth/AuthHome";
import LogIn from "../screens/Auth/LogIn";
import Confirm from "../screens/Auth/Confirm";
import SignUp from "../screens/Auth/SignUp";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    LogIn,
    Confirm,
    SignUp
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
