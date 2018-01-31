// Initial state

const initialItemDetailStatus = {
  retainedStatus: {},
  temporalStatus: {}
};

// Reducers

export const itemDetailStatus = (state = initialItemDetailStatus, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.state.itemDetailStatus;
    default:
      return state;
  }
};
