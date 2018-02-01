// Initial state

const initialItemStatus = {
  retainedStatus: {
    isTissueBall: false // true, false
  },
  temporalStatus: {}
};

// Action creator

export const changeItemStatus = (isRetained, propName, value) => {
  return {
    type: 'CHANGE_ITEM_STATUS',
    isRetained: isRetained,
    propName: propName,
    value: value
  };
};

// Reducers

export const itemStatus = (state = initialItemStatus, action) => {
  switch (action.type) {
    case 'CHANGE_ITEM_STATUS':
      return Object.assign({}, state, {
        [action.isRetained ? 'retainedStatus' : 'temporalStatus']:
          Object.assign({}, action.isRetained ? state.retainedStatus : state.temporalStatus, {
            [action.propName]: action.value
          })
      });
    case 'LOAD':
      return action.state.itemStatus;
    default:
      return state;
  }
};
