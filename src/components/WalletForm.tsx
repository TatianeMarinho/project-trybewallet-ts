import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, INICIAL_FORM_EXPENSES, StateType } from '../type';
import { expenseNew, fetchCurrencies, fetchexchangeRates } from '../redux/actions';

function WalletForm() {
  const [formState, setFormState] = useState(INICIAL_FORM_EXPENSES);
  const [idState, setIdState] = useState(0);
  const dispatch: Dispatch = useDispatch();
  const currencies = useSelector((state: StateType) => state.wallet.currencies);

  const handleinput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // salvando o estado anterio e chamando a api
    const stateData = {
      id: idState,
      ...formState,
      exchangeRates: await fetchexchangeRates(),
    };
    dispatch(expenseNew(stateData));
    setIdState((newId) => newId + 1);
    setFormState(INICIAL_FORM_EXPENSES);
  };

  const methodPay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tagExpense = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Valor:
        <input
          type="text"
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
          {
            methodPay.map((method) => (
              <option value={ method } key={ method }>{method}</option>
            ))
          }
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
          {
            tagExpense.map((tag) => (
              <option value={ tag } key={ tag }>{tag}</option>
            ))
          }
        </select>
      </label>
      <button>
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
