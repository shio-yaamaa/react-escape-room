// itemsから直接わかるところは省く
// itemsから間接的に推測できるものは明示する

// Initial state

const initialStatus = {
	retainedStatus: {
		picture: 'SCREWED', // 'UNSCREWED', 'DETACHED'
		window: 'CURTAIN_CLOSED',
			// 'CURTAIN_OPEN', 'BOARD1', 'BOARD2', 'BOARD1_2', 'BOARD2_1' (奥が先)
		dialNumber: [0, 0, 0],
		door: 'LOCKED', // 'UNLOCKED'
		soil: 'ON_PLANTER', // 'WIPED'
		upperDrawer: 'LOCKED', // 'UNLOCKED'
		box: 'LOCKED', // 'UNLOCKED'
		locker1: 'LOCKED', // 'UNLOCKED'
		locker2: 'LOCKED', // 'UNLOCKED'
		locker3: 'LOCKED', // 'UNLOCKED'
		hangingPlant: 'NOTHING',
			// 'STICK', 'KEY_FOUND (even if the key is already obtained)'
	},
	temporalStatus: {
		box: 'CLOSED', // 'OPEN'
		book: 'CLOSED', // 'OPEN'
		drawer: 'BOTH_CLOSED', // 'UPPER_OPEN', 'LOWER_OPEN'
		door: 'CLOSED', // 'OPEN'
		carpet: 'LAID', // 'FLIPPED'
		locker: 'ALL_CLOSED',
			// 'LOCKER1_OPEN', 'LOCKER2_OPEN', 'LOCKER3_OPEN'
	}
};

// Action creators

export const changeStatus = (isRetained, propName, value) => {
  return {
    type: 'CHANGE_STATUS',
    isRetained: isRetained,
    propName: propName,
    value: value
  };
};

export const incrementDialNumber = (digit) => {
	return {
		type: 'INCREMENT_DIAL_NUMBER',
		digit: digit
	};
};

export const resetTemporalStatus = (propName) => {
	return {
		type: 'RESET_TEMPORAL_STATUS',
		propName: propName
	};
};

// Reducers

// object作りすぎ？

export const status = (state = initialStatus, action) => {
	switch (action.type) {
		case 'CHANGE_STATUS':
			return Object.assign({}, state, {
				[action.isRetained ? 'retainedStatus' : 'temporalStatus']:
					Object.assign({}, action.isRetained ? state.retainedStatus : state.temporalStatus, {
						[action.propName]: action.value
					})
			});
		case 'INCREMENT_DIAL_NUMBER':
			const firstDigit  = (state.retainedStatus.dialNumber[0] + (action.digit === 0 ? 1 : 0)) % 10;
			const secondDigit = (state.retainedStatus.dialNumber[1] + (action.digit === 1 ? 1 : 0)) % 10;
			const thirdDigit  = (state.retainedStatus.dialNumber[2] + (action.digit === 2 ? 1 : 0)) % 10;
			return Object.assign({}, state, {
				retainedStatus: Object.assign({}, state.retainedStatus, {
					dialNumber: [firstDigit, secondDigit, thirdDigit]
				})
			});
		case 'RESET_TEMPORAL_STATUS':
			return Object.assign({}, state, {
				temporalStatus: Object.assign({}, state.temporalStatus, {
					[action.propName]: initialStatus.temporalStatus[action.propName]
				})
			});
		case 'LOAD':
			return action.state.status;
		default:
			return state;
	}
};