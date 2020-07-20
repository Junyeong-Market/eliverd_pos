// import { Action } from 'redux';
// import {
//   INSERT_SELECTED_REGISTER,
//   DELETE_SELECTED_REGISTER,
//   SET_SEARCHED_REGISTER,
//   CLEAR_SEARCHED_REGISTER
// } from '../actions/searchRegi';

// const initialState = {
//   selectedRegister: [{ realname: 'null', nickname: 'null' }],
//   searchedRegister: [{ realname: 'null', nickname: 'null' }]
// };
// // 이게 리듀서
// export default function searchRegister(
//   state = initialState,
//   action: Action<string>
// ) {
//   switch (action.type) {
//     case INSERT_SELECTED_REGISTER:
//       return state;
//     case DELETE_SELECTED_REGISTER:
//       return state;
//     case SET_SEARCHED_REGISTER:
//       return action.realname;
//     case CLEAR_SEARCHED_REGISTER:
//       return state;
//     default:
//       return state;
//   }
// }
