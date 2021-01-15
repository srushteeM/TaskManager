import React from 'react';
import { Icon} from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Image } from "react-native";

import AddTaskScreen from '../screens/AddTaskScreen';
import ViewTaskScreen from '../screens/ViewTaskScreen';

export const AppTabNavigator = createBottomTabNavigator({
  AddTask : {
    screen: AddTaskScreen,
    navigationOptions :{
      tabBarIcon: (
        <Image
          source={require("../assets/addTask.jpg")}
          style={{
            width: 20,
            height: 20
          }}
        />
      ),
      tabBarLabel : "Add Tasks",
    }
  },
  ViewTask: {
    screen: ViewTaskScreen,
    navigationOptions :{
      tabBarIcon: (
        <Image
          source={require("../assets/viewTask.jfif")}
          style={{
            width: 20,
            height: 20
          }}
        />
      ),
      tabBarLabel : "View Tasks",
    }
  }
});
