/*

HoC that provides access to flash messages stored in Redux state and actions to operate on them

*/

import { getActions, addAction, addReducer } from 'meteor/vulcan:lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*

  Messages actions

*/

addAction({
  messages: {
    flash(content, flashType) {
      return {
        type: 'FLASH',
        content,
        flashType,
      };
    },
    clear(i) {
      return {
        type: 'CLEAR',
        i,
      };
    },
    markAsSeen(i) {
      return {
        type: 'MARK_AS_SEEN',
        i,
      };
    },
    clearSeen() {
      return {
        type: 'CLEAR_SEEN'
      };
    },
  }
});


/*

  Messages reducers

*/

function addFlash(state, action) {
  if (state.some((message) =>
      message.show === true && message.content === action.content)) {
    // Don't add duplicate messages
    return state;
  }

  const flashType = typeof action.flashType === 'undefined' ? 'error' : action.flashType;

  return [
    ...state,
    { _id: state.length, content: action.content, flashType, seen: false, show: true },
  ];
}

addReducer({
  messages: (state = [], action) => {
    // default values
    const currentMsg = typeof action.i === 'undefined' ? {} : state[action.i];

    switch(action.type) {
      case 'FLASH':
        return addFlash(state, action);
      case 'MARK_AS_SEEN':
        return [
          ...state.slice(0, action.i),
          { ...currentMsg, seen: true },
          ...state.slice(action.i + 1),
        ];
      case 'CLEAR':
        return [
          ...state.slice(0, action.i),
          { ...currentMsg, show: false },
          ...state.slice(action.i + 1),
        ];
      case 'CLEAR_SEEN':
        return state.map(message => message.seen ? { ...message, show: false } : message);
      default:
        return state;
    }
  },
});

/*

  withMessages HOC

*/

const mapStateToProps = state => ({ messages: state.messages, });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().messages, dispatch);

const withMessages = component => connect(mapStateToProps, mapDispatchToProps)(component);

export default withMessages;
