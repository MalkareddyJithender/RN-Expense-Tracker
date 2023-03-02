import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ expense, confirmButtonText, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: expense ? expense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expense ? getFormattedDate(expense.date) : "",
      isValid: true,
    },
    description: {
      value: expense ? expense.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value.trim(),
    };

    // validating inputs
    const amountIsValid = expenseData.amount > 0;
    const dateIsValid = expenseData.date.toDateString() !== "Invalid Date";
    const descIsValid = expenseData.description.length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      setInputs((curInputs) => ({
        amount: { ...curInputs.amount, isValid: amountIsValid },
        date: { ...curInputs.date, isValid: dateIsValid },
        description: { ...curInputs.description, isValid: descIsValid },
      }));
      // Alert.alert("Invalid Inputs!", "please check your entered values.");
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: inputChangedHandler.bind(this, "amount"),
          }}
          error={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "number-pad",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangedHandler.bind(this, "date"),
          }}
          error={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: inputChangedHandler.bind(this, "description"),
        }}
        error={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Inputs! - Please check your entered values.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {confirmButtonText}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
    margin: 4,
    textAlign: "center",
  },
});
