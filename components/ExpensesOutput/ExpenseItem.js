import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";

function ExpenseItem({id, description, amount, date }) {
  const navigation = useNavigation();

  function expenseItemPressHandler() {
    // route params
    navigation.navigate('ManageExpense',{
      expenseId:id
    })
  }

  return (
    <Pressable
      onPress={expenseItemPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.65,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.6,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
