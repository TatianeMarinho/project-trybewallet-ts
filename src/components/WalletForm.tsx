import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, ExpensesType, INICIAL_FORM_EXPENSES, StateType } from '../type';
import { expenseNew, fetchCurrencies, fetchexchangeRates } from '../redux/actions';

function WalletForm() {
  const [formState, setFormState] = useState<ExpensesType>(INICIAL_FORM_EXPENSES);
  const { expenses } = useSelector((state: StateType) => state.wallet);
  const dispatch: Dispatch = useDispatch();
  const currencies = useSelector((state: StateType) => state.wallet.currencies);

  const handleinput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      id: expenses.length,
    });
  };
  console.log(formState);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // salvando o estado anterio e chamando a api
    const stateData = {
      ...formState,
      exchangeRates: await fetchexchangeRates(),
    };
    dispatch(expenseNew(stateData));
    setFormState(INICIAL_FORM_EXPENSES);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Valor:
        <input
          type="number"
          name="value"
          value={ formState.value }
          onChange={ handleinput }
          data-testid="value-input"
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          value={ formState.description }
          onChange={ handleinput }
          data-testid="description-input"
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          value={ formState.currency }
          onChange={ handleinput }
          data-testid="currency-input"
        >
          {
            currencies?.map((coin) => (
              <option
                key={ coin }
                value={ coin }
              >
                {coin}
              </option>
            ))
          }
        </select>
      </label>
      <label>
        Método de Pagamento:
        <select
          name="method"
          id="method"
          value={ formState.method }
          onChange={ handleinput }
          data-testid="method-input"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartão de crédito">Cartão de Crédito</option>
          <option value="cartão de débito">Cartão de Débito</option>
        </select>
      </label>
      <label>
        Tag:
        <select
          name="tag"
          id="tag"
          value={ formState.tag }
          onChange={ handleinput }
          data-testid="tag-input"
        >
          <option value="alimentação">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saúde">Saúde</option>
        </select>
      </label>
      <button>
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
