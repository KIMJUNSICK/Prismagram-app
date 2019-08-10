import { View } from "react-native";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const TabNavigation = createBottomTabNavigator({
  Feed: {
    screen: Home
  },
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("add");
      }
    }
  },
  Notifications,
  Profile
});

export default createAppContainer(TabNavigation);
