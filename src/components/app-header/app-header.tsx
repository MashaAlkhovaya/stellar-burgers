import { selectUser } from '@selectors';
import { useSelector } from '@services';
import { AppHeaderUI } from '@ui';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
