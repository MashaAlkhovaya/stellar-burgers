import { RouteComponent } from '@components';
import { Preloader } from '@ui';

import type { AppContentProps } from './type';

import styles from '../app/app.module.css';

export const AppContent = ({ isLoading, error }: AppContentProps): React.JSX.Element => {
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
