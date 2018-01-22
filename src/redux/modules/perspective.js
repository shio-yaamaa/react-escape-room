// Action creator

export const changePerspective = perspective => {
  return {
    type: 'CHANGE_PERSPECTIVE',
    perspective: perspective
  };
};

// Reducer

export const perspective = (state = 'viewWithSofa', action) => {
	switch (action.type) {
		case 'CHANGE_PERSPECTIVE':
			return action.perspective;
		case 'LOAD':
			return action.state.perspective;
		default:
			return state;
	}
}