import { AppHeader, ProtectedRoute } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
} from '@pages';
import { Preloader } from '@ui';
import { Routes, Route } from 'react-router-dom';

import type { AppContentProps } from './type';

import '../../index.css';
import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const isIngredientsLoading = false;
  const ingredientsError = null;

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent isLoading={isIngredientsLoading} error={ingredientsError} />
    </div>
  );
};

export default App;

/* Маршруты показываются только когда ингредиенты загружены: без них не
   отрисовать ни конструктор, ни состав заказа. */
const AppContent = ({ isLoading, error }: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты
        {error.message ? `: ${error.message}` : '.'}
      </p>
    );
  }

  return <RouteComponent />;
};

const RouteComponent = (): React.JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};
