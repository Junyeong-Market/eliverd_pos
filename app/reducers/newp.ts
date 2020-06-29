import { Action } from 'redux';
import { PRINTTRASH_NEW } from '../actions/new';

// 이게 리듀서
export default function newstring(state = '', action: Action<string>) {
  switch (action.type) {
    case PRINTTRASH_NEW:
      return '<h2>trash</h2>';
    default:
      return state;
  }
}
