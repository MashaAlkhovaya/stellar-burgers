import { useDispatch } from '@services';
import { logoutUser } from '@slices';
import { ProfileMenuUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await dispatch(logoutUser());
    void navigate('/login');
  };

  return <ProfileMenuUI handleLogout={() => void handleLogout()} pathname={pathname} />;
};
