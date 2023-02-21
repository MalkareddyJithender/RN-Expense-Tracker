import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import RecentExpenses from "../screens/RecentExpenses";
import AllExpenses from "../screens/AllExpenses";
import { GlobalStyles } from "../constants/styles";

const Tab = createBottomTabNavigator();

export function ExpensesOverview() {
  const screenOptions = {
    headerStyle: {
      backgroundColor: GlobalStyles.colors.primary400,
    },
    headerTintColor: GlobalStyles.colors.white,
    tabBarStyle:{
      backgroundColor:GlobalStyles.colors.primary400
    },
    tabBarActiveTintColor:GlobalStyles.colors.accent500
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel:'Recent',
          tabBarIcon: ({color,size}) => <Ionicons name='hourglass' color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon:({color,size}) => <Ionicons name='calendar' color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}
