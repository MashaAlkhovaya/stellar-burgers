import { AppHeader, AppContent } from '@components';
import {
  selectIngredientsError,
  selectIngredientsLoading,
  selectIsAuthChecked,
} from '@selectors';
import { useDispatch, useSelector } from '@services';
import { fetchIngredients, checkUserAuth } from '@slices';
import { Preloader } from '@ui';
import { useEffect } from 'react';

import '../../index.css';

import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchIngredients());
    void dispatch(checkUserAuth());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent isLoading={isIngredientsLoading} error={ingredientsError} />
    </div>
  );
};

export default App;
