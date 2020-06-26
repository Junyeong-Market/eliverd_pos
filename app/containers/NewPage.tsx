import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import New from '../components/New';
import { printtrash, trashTwice } from '../actions/new';
import { counterStateType } from '../reducers/types';

function mapStateToProps(state: counterStateType) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      printtrash,
      trashTwice
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
