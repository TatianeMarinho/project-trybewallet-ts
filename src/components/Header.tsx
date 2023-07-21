import { useSelector } from 'react-redux';
import { ExpensesType, StateType } from '../type';

function Header() {
  const { email } = useSelector((state: StateType) => state.user);
  const expenses = useSelector((state: StateType) => state.wallet.expenses);

  const coin = 'BRL';
  console.log(expenses);

  const expensesTotal = () => {
    let total = 0;

    expenses.forEach((item: ExpensesType) => {
      const { currency } = item;
      const value = parseFloat(item.value);
      const exchangeRates = parseFloat(item.exchangeRates[currency].ask);

      if (exchangeRates !== undefined) {
        total += value * exchangeRates;
      } else {
        console.log(`não foi possivel fazer o cambio com a moeda ${currency}`);
      }
    });
    return total.toFixed(2);
  };

  const total = expensesTotal();
  console.log(total);

  return (
    <header>
      <h4 data-testid="email-field">
        { email }
      </h4>
      <h4>
        Despesa Total: R$
        {' '}
        <span data-testid="total-field">
          { total }
        </span>
      </h4>
      <h4 data-testid="header-currency-field">
        { coin }
      </h4>
    </header>
  );
}

export default Header;
