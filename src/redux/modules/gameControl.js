// Initial state

const initialGameControl = {
	isHintVisible: false
}

// Action creators

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
    case 'SHOW_HINT':
      return {
        isHintVisible: true
      };
    case 'HIDE_HINT':
      return {
        isHintVisible: false
      };
    default:
    	return state;
  }
};