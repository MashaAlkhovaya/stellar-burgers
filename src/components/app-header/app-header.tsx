import { useSelector } from '@services';
import { AppHeaderUI } from '@ui';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  const userName = useSelector((state) => state.auth.user?.name);

  return <AppHeaderUI userName={userName} />;
};
