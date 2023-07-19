import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE_FORM } from '../type';
import { login } from '../redux/actions';

function Login() {
  const [loginState, setLoginState] = useState(INITIAL_STATE_FORM);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleinput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const isvalidButton = () => {
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailIsValid = emailRegex.test(loginState.email);
    const paswordRegex = /^.{6,}$/;
    const paswordIsValid = paswordRegex.test(loginState.password);
    return emailIsValid && paswordIsValid;
  };
  console.log(loginState);

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(loginState.email));
    navigate('/carteira');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        e-mail:
        <input
          type="text"
          name="email"
          value={ loginState.email }
          onChange={ handleinput }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="">
        senha:
        <input
          type="trybe"
          name="password"
          value={ loginState.password }
          onChange={ handleinput }
          data-testid="password-input"
        />
      </label>
      <button
        disabled={ !isvalidButton() }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
