import { useSelector } from 'react-redux';
import { StateType } from '../type';

function WalletForm() {
  const { currencies } = useSelector((state: StateType) => state.wallet);

  return (
    <form action="">
      <label>
        Valor:
        <input
          type="number"
          name="value"
          data-testid="value-input"
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          data-testid="description-input"
        />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
        >
          {
            currencies.map((coin) => (
              <option key={ coin }>{ coin }</option>
            ))
          }
        </select>
      </label>
      <label>
        Método de Pagamento:
        <select
          name="method"
          id="method"
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
