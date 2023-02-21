import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { expenses } from '../fixtures/expenses';


function RecentExpenses(){
    return <ExpensesOutput expenses={expenses} period='Last 7 Days' />
};

export default RecentExpenses;