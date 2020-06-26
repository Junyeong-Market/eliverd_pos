import { Action } from 'redux';
import { PRINTTRASH_NEW } from '../actions/new';

// 이게 리듀서
export default function newp(state = 0, action: Action<string>) {
  switch (action.type) {
    case PRINTTRASH_NEW:
      return state + 1;
    default:
      return state;
  }
}
