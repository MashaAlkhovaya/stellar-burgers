import { selectAuthError } from '@selectors';
import { useDispatch, useSelector } from '@services';
import { registerUser } from '@slices';
import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
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
      await dispatch(registerUser({ name: userName, email, password })).unwrap();
      void navigate(from);
    } catch {
      // ошибка уже сохранена в state.auth.error через rejected
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={(e) => void handleSubmit(e)}
    />
  );
};
