import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";


function ExpensesOutput({expenses,period}) {
  return (
    <View>
      <ExpensesSummary expenses={expenses} periodName={period} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;
