import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      try {
        const fetchedExpenses = await fetchExpenses();
        expensesCtx.setExpenses(fetchedExpenses);
      } catch (e) {
        setError("Couldn't fetch expenses - please try again after sometime.");
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="Last 7 Days"
      fallbackText="No Expenses Registered For Last 7 Days ..."
    />
  );
}

export default RecentExpenses;
