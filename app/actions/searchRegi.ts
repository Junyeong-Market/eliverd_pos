import { GetState, Dispatch } from '../reducers/types';

// 결국엔 여기는 값을 증가, 하락하는 액션타입을 정의하고
// 짝수(올림)과 1초 후 1을 증가시키는 함수를 만들어둔 곳. 둘 다 디스패치임

// 이게 액션 타입을 정의 한 것
export const SET_SEARCHED_REGISTER = 'SET_SEARCHED_REGISTER';
export const CLEAR_SEARCHED_REGISTER = 'CLEAR_SEARCHED_REGISTER';
export const INSERT_SELECTED_REGISTER = 'INSERT_SELECTED_REGISTER';
export const DELETE_SELECTED_REGISTER = 'DELETE_SELECTED_REGISTER';

// 이게 액션 생성 함수
export function setSearchedRegister(realname: string[], nickname: string[]) {
  return {
    type: SET_SEARCHED_REGISTER,
    realname,
    nickname
  };
}

export function clearSearchedRegister() {
  return {
    type: CLEAR_SEARCHED_REGISTER
  };
}

export function insertSelectedRegister(nickname: string) {
  return {
    type: INSERT_SELECTED_REGISTER,
    nickname
  };
}

export function deleteSelectedRegister(nickname: string) {
  return {
    type: DELETE_SELECTED_REGISTER,
    nickname
  };
}
