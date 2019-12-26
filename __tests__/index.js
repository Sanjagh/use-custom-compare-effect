// @flow
import { renderHook, act } from '@testing-library/react-hooks';
import useCustomCompareEffect from '../src';

describe('useCustomCompareEffect', () => {
  test('Handles object value changes with custom deep equal', () => {
    const cb = jest.fn();
    let inp = { id: '123abc', data: { foo: true, bar: 'baz' } };
    const { rerender } = renderHook(() =>
      useCustomCompareEffect(cb, inp, (a, b) => {
        return [a.id === b.id, a.data.foo === b.data.foo, a.data.bar === b.data.bar].every(x => x);
      }),
    );

    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = { id: '123abc', data: { foo: true, bar: 'baz' } };
    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = { id: '123abc', data: { foo: true, bar: 'buzz' } };
    rerender();
    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = { id: '123abc', data: { foo: false, bar: 'buzz' } };
    rerender();
    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();
  });

  test('Handles run effect on certain property change', () => {
    // Callback should only called when id changed
    const cb = jest.fn();
    let inp = { id: '123abc', data: { foo: true, bar: 'baz' } };
    const { rerender } = renderHook(() =>
      useCustomCompareEffect(cb, inp, (a, b) => {
        return a.id === b.id;
      }),
    );

    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    inp = { id: '123abc', data: null };
    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = { id: '123abc', data: { foo: 2, bar: 'buzz' } };
    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = { id: '123', data: null };
    rerender();
    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    inp = { id: '123', data: null };
    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();
  });

  test('Handles privimte dep changes', () => {
    const cb = jest.fn();
    let inp = 'Hello';
    const { rerender } = renderHook(() => useCustomCompareEffect(cb, inp, (a, b) => a === b));

    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();

    inp = 'World';
    rerender();
    expect(cb).toHaveBeenCalledTimes(1);
    cb.mockClear();

    rerender();
    expect(cb).toHaveBeenCalledTimes(0);
    cb.mockClear();
  });
});
