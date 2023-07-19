import { useSelector } from 'react-redux';
import { StateType } from '../type';

function Header() {
  const { email } = useSelector((state: StateType) => state.user);
  const totalExpense = 0;
  const coin = 'BRL';

  return (
    <header>
      <h4 data-testid="email-field">
        { email }
      </h4>
      <h4 data-testid="total-field">
        { `Despesa Total: R$ ${totalExpense}` }
      </h4>
      <h4 data-testid="header-currency-field">
        { coin }
      </h4>
    </header>
  );
}

export default Header;
