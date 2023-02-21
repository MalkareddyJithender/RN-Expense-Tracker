import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { expenses } from '../fixtures/expenses';

function AllExpenses(){
    return <ExpensesOutput expenses={expenses} period='All' />
};

export default AllExpenses;