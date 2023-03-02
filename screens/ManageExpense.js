import { View, StyleSheet, TextInput } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, upgradeExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const screenTitle = isEditing ? "Edit Expense" : "Add Expense";
  const confirmButtonText = isEditing ? "Update" : "Add";
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  // To Avoid flickering effect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
    });
  }, [isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await upgradeExpense(expenseId, expenseData);
        expensesCtx.updateExpense({
          id: expenseId,
          data: expenseData,
        });
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({
          id,
          ...expenseData,
        });
      }
      navigation.goBack();
    } catch (e) {
      setIsSubmitting(false);
      setError("Couldn't save expense - please try again later!");
    }
  }

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (e) {
      setIsSubmitting(false);
      setError("Couldn't delete expense - please try again later!");
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        confirmButtonText={confirmButtonText}
        expense={selectedExpense}
      />
      {isEditing && (
        <View style={styles.trashContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  trashContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
});
