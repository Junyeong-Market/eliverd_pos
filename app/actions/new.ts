import { Dispatch } from '../reducers/types';

// 결국엔 여기는 값을 증가, 하락하는 액션타입을 정의하고
// 짝수(올림)과 1초 후 1을 증가시키는 함수를 만들어둔 곳. 둘 다 디스패치임

// 이게 액션 타입을 정의 한 것
export const PRINTTRASH_NEW = 'PRINTTRASH_NEW';

// 이게 액션 생성 함수
export function printtrash() {
  return {
    type: PRINTTRASH_NEW
  };
}

// 펑션

export function trashTwice() {
  return (dispatch: Dispatch) => {
    dispatch(printtrash());
  };
}
