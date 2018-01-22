// Initial state

const initialStatus = 'start'

// Action creator

export const nextScreen = () => {
  return {
    type: 'NEXT_SCREEN'
  };
};

// Reducer

export const screen = (state = initialStatus, action) => {
	switch (action.type) {
		case 'NEXT_SCREEN':
			switch (state) {
				case 'start':
					return 'load';
				case 'load':
					return 'game';
				case 'game':
					return 'end';
				default:
					return state;
			}
		default:
			return state;
	}
};