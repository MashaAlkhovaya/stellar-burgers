import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from '../burger-constructor-slice';
import { createOrder } from '../order-slice';

import type { TConstructorIngredient } from '@utils-types';

const bun = {
  _id: 'bun-1',
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
const main = { ...bun, _id: 'main-1', name: 'Котлета', type: 'main' };

const item = (id: string): TConstructorIngredient => ({ ...main, id });

describe('burgerConstructor reducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({ bun: null, ingredients: [] });
  });

  describe('addIngredient', () => {
    it('булка заменяет старую булку и не попадает в список начинок', () => {
      const stateBefore = {
        bun: { ...bun, _id: 'old-bun', id: 'old-id' },
        ingredients: [],
      };

      const state = reducer(stateBefore, addIngredient(bun));

      expect(state.bun).toMatchObject({ _id: 'bun-1' });
      expect(state.bun?.id).toEqual(expect.any(String));
      expect(state.ingredients).toEqual([]);
    });

    it('начинка добавляется в конец списка, булка не меняется', () => {
      const stateBefore = { bun: null, ingredients: [item('a')] };

      const state = reducer(stateBefore, addIngredient(main));

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(item('a'));
      expect(state.ingredients[1]).toMatchObject({ _id: 'main-1' });
      expect(state.ingredients[1].id).toEqual(expect.any(String));
    });
  });

  it('removeIngredient: удаляет ингредиент по id', () => {
    const stateBefore = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [item('a'), item('b')],
    };

    const state = reducer(stateBefore, removeIngredient('a'));

    expect(state.ingredients).toEqual([item('b')]);
    expect(state.bun).toEqual({ ...bun, id: 'bun-id' });
  });

  describe('moveIngredient', () => {
    const stateBefore = {
      bun: null,
      ingredients: [item('a'), item('b'), item('c')],
    };

    it('вверх: меняет местами с предыдущим', () => {
      const state = reducer(stateBefore, moveIngredient({ id: 'b', direction: 'up' }));
      expect(state.ingredients).toEqual([item('b'), item('a'), item('c')]);
    });

    it('вниз: меняет местами со следующим', () => {
      const state = reducer(stateBefore, moveIngredient({ id: 'b', direction: 'down' }));
      expect(state.ingredients).toEqual([item('a'), item('c'), item('b')]);
    });

    it('первый элемент вверх: порядок не меняется', () => {
      const state = reducer(stateBefore, moveIngredient({ id: 'a', direction: 'up' }));
      expect(state.ingredients).toEqual([item('a'), item('b'), item('c')]);
    });

    it('последний элемент вниз: порядок не меняется', () => {
      const state = reducer(stateBefore, moveIngredient({ id: 'c', direction: 'down' }));
      expect(state.ingredients).toEqual([item('a'), item('b'), item('c')]);
    });
  });

  it('clearConstructor: убирает булку и начинки', () => {
    const stateBefore = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [item('a')],
    };

    const state = reducer(stateBefore, clearConstructor());

    expect(state).toEqual({ bun: null, ingredients: [] });
  });

  it('createOrder.fulfilled: очищает конструктор после заказа', () => {
    const stateBefore = {
      bun: { ...bun, id: 'bun-id' },
      ingredients: [item('a')],
    };

    const state = reducer(
      stateBefore,
      createOrder.fulfilled({} as never, 'test-id', [] as never)
    );

    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
