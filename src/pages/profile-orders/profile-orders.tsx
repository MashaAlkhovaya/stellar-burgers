import { selectUserOrders } from '@selectors';
import { useDispatch, useSelector } from '@services';
import { fetchUserOrders } from '@slices';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
