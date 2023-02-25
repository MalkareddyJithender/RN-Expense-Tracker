import { createContext, useReducer } from "react";
import { expenses } from "../fixtures/expenses";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const id = new Date().getTime();
      const expense = { id, ...action.payload };
      return [expense, ...state];
    }
    case "UPDATE_EXPENSE": {
      const expenseId = action.payload.id;
      const expenseIndex = state.findIndex(
        (expense) => expense.id === expenseId
      );
      const updatableExpense = state[expenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    }
    case "DELETE_EXPENSE": {
      const id = action.payload;
      return state.filter((expense) => expense.id !== id);
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesData, dispatch] = useReducer(expensesReducer, expenses);

  function addExpense(expenseData) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseData,
    });
  }

  function updateExpense(expenseData) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: expenseData,
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  }

  const value = {
    expenses: expensesData,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
