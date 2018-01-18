// Initial state

const initialGameControl = {
  isSaved: false,
	isHintVisible: false
}

// Action creators

export const save = () => {
  return {
    type: 'SAVE'
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
}

// Reducers

export const gameControl = (state = initialGameControl, action) => {
  switch (action.type) {
    case 'SAVE':
    	return {
    		isSaved: true,
        isHintVisible: state.isHintVisible
    	};
    case 'SHOW_HINT':
      return {
        isSaved: state.isSaved,
        isHintVisible: true
      };
    case 'HIDE_HINT':
      return {
        isSaved: state.isSaved,
        isHintVisible: false
      };
    default:
    	return state;
  }
};