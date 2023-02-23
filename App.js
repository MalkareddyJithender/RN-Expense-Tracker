import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ManageExpense from "./screens/ManageExpense";
import { ExpensesOverview } from "./configuration/navigation";
import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:GlobalStyles.colors.primary500,
          },
          headerTintColor:'#fff'
        }}>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
            title:'Manage Expense',
            presentation:'modal'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
