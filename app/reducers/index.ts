/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
import newstring from './newp';

// 값이 다른 Reducer 기능을 가진 객체를 단일 Reducer 기능으로 전환합니다. 모든 자식 Reducer를 호출하고 결과를 단일 상태 객체로 수집합니다.이 객체의 키는 전달 된 Reducer 기능의 키에 해당합니다.
// @ts-ignore
export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    newstring,
    counter
  });
}
