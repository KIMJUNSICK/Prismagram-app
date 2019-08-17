import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    PhotoNavigation,
    TabNavigation,
    MessageNavigation
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    }
  }
);

export default createAppContainer(MainNavigation);
