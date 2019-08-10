import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
