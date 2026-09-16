import {
  AppHeader,
  ProtectedRoute,
  Modal,
  IngredientDetails,
  OrderInfo,
} from '@components';
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
import { useDispatch, useSelector } from '@services';
import { fetchIngredients, checkUserAuth } from '@slices';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';

import type { AppContentProps } from './type';

import '../../index.css';

import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const isIngredientsLoading = useSelector((state) => state.ingredients.isLoading);
  const ingredientsError = useSelector((state) => state.ingredients.error);
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);

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
  const navigate = useNavigate();
  const location = useLocation();
  const background = (location.state as { background?: Location })?.background;
  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed/:number"
          element={
            <Modal title="Детали заказа" onClose={() => void navigate('/')}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <Modal title="Детали ингредиента" onClose={() => void navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <Modal
                title="Детали заказа"
                onClose={() => void navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <Modal title="Детали заказа" onClose={() => void navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={() => void navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal title="Детали заказа" onClose={() => void navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
