// Initial state

const initialGameControl = {
  isSaved: false,
	hint: null
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

export const cancelHint = () => {
  return {
    type: 'CANCEL_HINT'
  };
}

// Reducers

export const gameControl = (state = initialGameControl, action) => {
  switch (action.type) {
    case 'SAVE':
    	return {
    		hint: state.hint,
    		isSaved: true
    	};
    case 'SHOW_HINT':
      return {
        hint: '頑張ってね', // scenario/hintsから
        isSaved: state.isSaved
      };
    case 'CANCEL_HINT':
      return {
        hint: null,
        isSaved: state.isSaved
      };
    default:
    	return state;
  }
};