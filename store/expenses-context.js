import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  setExpenses: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [action.payload, ...state];

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

    case "SET_EXPENSES": {
      const inverse = action.payload.reverse();
      return inverse;
    }

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesData, dispatch] = useReducer(expensesReducer, []);

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

  function setExpenses(expenses) {
    dispatch({
      type: "SET_EXPENSES",
      payload: expenses,
    });
  }

  const value = {
    expenses: expensesData,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  console.log("Data",value.expenses)

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
