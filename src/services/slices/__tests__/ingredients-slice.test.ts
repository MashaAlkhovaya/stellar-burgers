import reducer, { fetchIngredients } from '../ingredients-slice';

const ingredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
};

describe('ingredients reducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({ isLoading: false, ingredients: [], error: null });
  });

  it('pending: включает загрузку и сбрасывает ошибку', () => {
    const stateBefore = {
      isLoading: false,
      ingredients: [ingredient],
      error: { message: 'ошибка' },
    };

    const state = reducer(stateBefore, fetchIngredients.pending('test-id'));

    expect(state).toEqual({
      isLoading: true,
      ingredients: [ingredient],
      error: null,
    });
  });

  it('fulfilled: сохраняет ингредиенты и выключает загрузку', () => {
    const stateBefore = {
      isLoading: true,
      ingredients: [],
      error: { message: 'ошибка' },
    };

    const state = reducer(
      stateBefore,
      fetchIngredients.fulfilled([ingredient], 'test-id')
    );

    expect(state).toEqual({
      isLoading: false,
      ingredients: [ingredient],
      error: null,
    });
  });

  it('rejected: сохраняет ошибку и выключает загрузку', () => {
    const stateBefore = {
      isLoading: true,
      ingredients: [],
      error: null,
    };

    const state = reducer(
      stateBefore,
      fetchIngredients.rejected(new Error('сбой'), 'test-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toMatchObject({ message: 'сбой' });
  });
});
