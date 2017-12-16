const stateToImageIndex = (perspective, status, items) => {
	switch (perspective) {

		// view with the sofa
		case 'viewWithSofa':
			if (status.retainedStatus.window === 'CURTAIN_CLOSED') {
				return items.stick.obtainStatus === 'NOT_OBTAINED'
					? (status.retainedStatus.picture !== 'DETACHED' ? '00' : '01')
					: (status.retainedStatus.picture !== 'DETACHED' ? '02' : '03');
			} else {
				return items.stick.obtainStatus === 'NOT_OBTAINED'
					? (status.retainedStatus.picture !== 'DETACHED' ? '04' : '05')
					: (status.retainedStatus.picture !== 'DETACHED' ? '06' : '07');
			}
		case 'plant':
			return status.retainedStatus.soil === 'ON_PLANTER'
				? '00'
				: (items.keyToLocker3.obtainStatus === 'NOT_OBTAINED' ? '01' : '02');
		case 'sofa':
			return items.stick.obtainStatus === 'NOT_OBTAINED' ? '00' : '01';
		case 'picture':
			switch (status.retainedStatus.picture) {
				case 'SCREWED':
					return '00';
				case 'UNSCREWED':
					return '01';
				case 'DETACHED':
					return items.keyToLocker1.obtainStatus === 'NOT_OBTAINED' ? '02' : '03';
				default:
					return;
			}

		// view with the window
		case 'viewWithWindow':
			switch (status.retainedStatus.window) {
				case 'CURTAIN_CLOSED':
					return '00';
				case 'CURTAIN_OPEN':
					return '01';
				case 'BOARD1':
					return '02';
				case 'BOARD2':
					return '03';
				case 'BOARD1_2':
					return '04';
				case 'BOARD2_1':
					return '05';
				default:
					return;
			}
		case 'box':
			return status.temporalStatus.box === 'CLOSED'
				? '00'
				: (items.screwdriver.obtainStatus === 'NOT_OBTAINED' ? '01' : '02');
		
		// view with the desk
		case 'viewWithDesk':
			return status.retainedStatus.window === 'CURTAIN_CLOSED' ? '00' : '01';
		case 'book':
			return status.temporalStatus.book === 'CLOSED' ? '00' : '01';
		case 'drawer':
			switch (status.temporalStatus.drawer) {
				case 'BOTH_CLOSED':
					return '00';
				case 'UPPER_OPEN':
					return '01';
				case 'LOWER_OPEN':
					return '02';
				default:
					return;
			}
		case 'upperDrawer':
			return '00';
		case 'carpet':
			return status.temporalStatus.carpet === 'LAID'
				? '00'
				: (items.board2.obtainStatus === 'NOT_OBTAINED' ? '01' : '02');
		case 'locker':
			switch (status.temporalStatus.locker) {
				case 'ALL_CLOSED':
					return '00';
				case 'LOCKER1_OPEN':
					return items.tissue.obtainStatus === 'NOT_OBTAINED' ? '01' : '02';
				case 'LOCKER2_OPEN':
					return items.keyToDoor.obtainStatus === 'NOT_OBTAINED' ? '03' : '04';
				case 'LOCKER3_OPEN':
					return items.board1.obtainStatus === 'NOT_OBTAINED' ? '05' : '06';
				default:
					return;
			}
		case 'tissueBox':
			return items.keyToDrawer.obtainStatus === 'NOT_OBTAINED' ? '00' : '01';
		case 'dial':
			return '00';

		// view with the door
		case 'viewWithDoor':
			switch (status.retainedStatus.window) {
				case 'CURTAIN_CLOSED':
					return '00';
				case 'CURTAIN_OPEN':
					return '01';
				case 'BOARD1':
					return '02';
				case 'BOARD2':
					return '03';
				default: // includes both 'BOARD1_2' and 'BOARD2_1'
					return status.temporalStatus.door === 'CLOSED' ? '04' : '05';
			}
		case 'hangingPlant':
			switch (status.retainedStatus.hangingPlant) {
				case 'NOTHING':
					return '00';
				case 'STICK':
					return '01';
				case 'KEY_FOUND':
					return '02';
				default:
					return;
			}
		default:
			return;
	}
};

export default stateToImageIndex;