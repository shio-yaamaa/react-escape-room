// Initial state

const initialGameControl = {
  motion: null,
  motionCallback: null,
	isHintVisible: false
}

// Action creators

export const startMotion = (motion, motionCallback) => {
  return {
    type: 'START_MOTION',
    motion: motion,
    motionCallback: motionCallback
  };
};

export const endMotion = () => {
  return {
    type: 'END_MOTION'
  };
};

export const showHint = () => {
	return {
		type: 'SHOW_HINT'
	};
};

export const hideHint = () => {
  return {
    type: 'HIDE_HINT'
  };
};

export const load = (state) => {
  return {
    type: 'LOAD',
    state: state
  };
};

// Reducers

export const gameControl = (state = initialGameControl, action) => {
  switch (action.type) {
    case 'START_MOTION':
      return {
        motion: action.motion,
        motionCallback: action.motionCallback,
        isHintVisible: state.isHintVisible
      };
    case 'END_MOTION':
      return {
        motion: null,
        motionCallback: null,
        isHintVisible: state.isHintVisible
      };
    case 'SHOW_HINT':
      return {
        motion: state.motion,
        motionCallback: state.motionCallback,
        isHintVisible: true
      };
    case 'HIDE_HINT':
      return {
        motion: state.motion,
        motionCallback: state.motionCallback,
        isHintVisible: false
      };
    default:
    	return state;
  }
};
