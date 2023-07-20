import { useSelector } from 'react-redux';
import { StateType } from '../type';

function Header() {
  const { email } = useSelector((state: StateType) => state.user);
  const expenses = useSelector((state: StateType) => state.wallet.expenses);

  const coin = 'BRL';

  return (
    <header>
      <h4 data-testid="email-field">
        { email }
      </h4>
      <h4 data-testid="total-field">
        { `Despesa Total: R$ ${expenses.values}` }
      </h4>
      <h4 data-testid="header-currency-field">
        { coin }
      </h4>
    </header>
  );
}

export default Header;
