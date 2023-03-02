import axios from "axios";

const BACKEND_URL =
  "https://react-native-expense-tra-1b6e8-default-rtdb.firebaseiocom";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export function upgradeExpense(id, updatedExpense) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, updatedExpense);
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}

export async function fetchExpenses() {
  const { data } = await axios.get(`${BACKEND_URL}/expenses.json`);
  const fetchedExpenses = [];
  for (const key in data) {
    const expense = {
      id: key,
      amount: data[key].amount,
      description: data[key].description,
      date: new Date(data[key].date),
    };
    fetchedExpenses.push(expense);
  }
  //   console.log("Data", fetchedExpenses);
  return fetchedExpenses;
}
