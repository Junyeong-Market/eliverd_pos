import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import New from '../components/New';
import { printtrash, trashTwice } from '../actions/new';
import { indexStateType } from '../reducers/types';

function mapStateToProps(state: indexStateType) {
  return {
    newstring: state.newstring
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
