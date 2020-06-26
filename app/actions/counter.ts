import { GetState, Dispatch } from '../reducers/types';

// 결국엔 여기는 값을 증가, 하락하는 액션타입을 정의하고
// 짝수(올림)과 1초 후 1을 증가시키는 함수를 만들어둔 곳. 둘 다 디스패치임

// 이게 액션 타입을 정의 한 것
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// 이게 액션 생성 함수
export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

// 1초 후에 1을 증가시키는 함수
export function incrementAsync(delay = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
