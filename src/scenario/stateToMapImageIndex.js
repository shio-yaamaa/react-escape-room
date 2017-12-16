const stateToMapImageIndex = (perspective, status, items) => {
	switch (perspective) {
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
		case 'locker':
			switch (status.temporalStatus.locker) {
				case 'ALL_CLOSED':
					return '00';
				case 'LOCKER1_OPEN':
					return '01';
				case 'LOCKER2_OPEN':
					return '02';
				case 'LOCKER3_OPEN':
					return '03';
				default:
					return;
			}
		default:
			return '00';
	}
};

export default stateToMapImageIndex;