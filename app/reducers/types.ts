import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

// 이게 초기값 정의
export type indexStateType = {
  counter: number;
  newstring: string;
  selectedRegister: JSX.IntrinsicElements;
  searchedRegister: JSX.IntrinsicElements;
};

export type GetState = () => indexStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<indexStateType, Action<string>>;
