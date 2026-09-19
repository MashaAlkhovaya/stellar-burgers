import { selectAuthError } from '@selectors';
import { useDispatch, useSelector } from '@services';
import { loginUser } from '@slices';
import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorText = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      void navigate(from);
    } catch {
      // ошибка уже сохранена в state.auth.error через rejected
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={(e) => void handleSubmit(e)}
    />
  );
};
