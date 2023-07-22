import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../type';
import { requesDeleteTable } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: StateType) => state.wallet);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(requesDeleteTable(id));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (parseFloat(item.value)
                    * parseFloat(item.exchangeRates[item.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button>Editar</button>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => handleDelete(item.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
