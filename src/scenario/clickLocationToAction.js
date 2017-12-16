import {changePerspective} from '../redux/modules/perspective';
import {changeStatus, incrementDialNumber, resetTemporalStatus} from '../redux/modules/status';
import {obtainItem, useItem} from '../redux/modules/items';
import {selectItem} from '../redux/modules/selectedItem';

// 観葉植物に棒を突っ込んでいる間は、下矢印を押されても無視
// mapIndexはstringなことに注意

const clickLocationToAction = (dispatch, perspective, mapIndex, location, status, items, selectedItem) => {
	switch (perspective) {

		// view with sofa
		case 'viewWithSofa':
			switch (location) {
				case 'LEFT':
					dispatch(changePerspective('viewWithDoor'));
					return;
				case 'RIGHT':
					dispatch(changePerspective('viewWithWindow'));
					return;
				case 'BLACK': // plant
					dispatch(changePerspective('plant'));
					return;
				case 'NAVY': // picture
					if (items.keyToLocker1.obtainStatus === 'NOT_OBTAINED') {
						dispatch(changePerspective('picture'));
					}
					return;
				case 'BLUE': // stick
					dispatch(changePerspective('sofa'));
					return;
				default:
					return;
			}
		case 'plant':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithSofa'));
					return;
				case 'BLACK':
					if (selectedItem === 'tissue' && status.retainedStatus.soil === 'ON_PLANTER') {
						dispatch(changeStatus(true, 'soil', 'WIPED'));
					} else if (items.keyToLocker3.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToLocker3'));
					}
					return;
				default:
					return;
			}
		case 'picture':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithSofa'));
					return;
				case 'BLACK': // screw
					switch (status.retainedStatus.picture) {
						case 'SCREWED':
							if (selectedItem === 'screwdriver') {
								dispatch(changeStatus(true, 'picture'), 'UNSCREWED');
								dispatch(useItem('screwdriver'));
								dispatch(selectItem(null));
							}
							return;
						case 'UNSCREWED':
							dispatch(changeStatus(true, 'picture', 'DETACHED'));
							return;
						default:
							return;
					}
				case 'NAVY': // picture
					if (status.retainedStatus.picture === 'UNSCREWED') {
						dispatch(changeStatus(true, 'picture', 'DETACHED'));
					}
					return;
				case 'BLUE': // keyToLocker1
					switch (status.retainedStatus.picture) {
						case 'UNSCREWED':
							dispatch(changeStatus(true, 'picture', 'DETACHED'));
							return;
						case 'DETACHED':
							if (items.keyToLocker1.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('keyToLocker1'));
							}
							return;
						default:
							return;
					}
				default:
					return;
			}
		case 'sofa':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithSofa'));
					return;
				case 'BLACK':
					if (items.stick.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('stick'));
					}
					return;
				default:
					return;
			}

		// view with window
		case 'viewWithWindow':
			switch (location) {
				case 'LEFT':
					dispatch(changePerspective('viewWithSofa'));
					return;
				case 'RIGHT':
					dispatch(changePerspective('viewWithDesk'));
					return;
				case 'BLACK':
					if (status.retainedStatus.window === 'CURTAIN_CLOSED') {
						dispatch(changeStatus(true, 'window', 'CURTAIN_OPEN'));
					}
					return;
				case 'NAVY':
					switch (status.retainedStatus.window) {
						case 'CURTAIN_CLOSED':
							dispatch(changeStatus(true, 'window', 'CURTAIN_OPEN'));
							return;
						case 'CURTAIN_OPEN':
							if (selectedItem === 'board1') {
								dispatch(changeStatus(true, 'window', 'BOARD1'));
								dispatch(useItem('board1'));
								dispatch(selectItem(null));
							} else if (selectedItem === 'board2') {
								dispatch(changeStatus(true, 'window', 'BOARD2'));
								dispatch(useItem('board2'));
								dispatch(selectItem(null));
							}
							return;
						case 'BOARD1':
							if (selectedItem === 'board2') {
								dispatch(changeStatus(true, 'window', 'BOARD1_2'));
								dispatch(useItem('board2'));
								dispatch(selectItem(null));
							}
							return;
						case 'BOARD2':
							if (selectedItem === 'board1') {
								dispatch(changeStatus(true, 'window', 'BOARD2_1'));
								dispatch(useItem('board1'));
								dispatch(selectItem(null));
							}
							return;
						default:
							return;
					}
				case 'BLUE':
					dispatch(changePerspective('box'));
					return;
				default:
					return;
			}
		case 'box':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithWindow'));
					dispatch(resetTemporalStatus('box'));
					return;
				case 'BLACK':
					if (selectedItem === 'keyToBox') {
						dispatch(changeStatus(true, 'box', 'UNLOCKED'));
						dispatch(useItem('keyToBox'));
						dispatch(selectItem(null));
					} else if (status.retainedStatus.box === 'UNLOCKED' && status.temporalStatus.box === 'CLOSED') {
						dispatch(changeStatus(false, 'box', 'OPEN'));
					}
					return;
				case 'NAVY':
					if (status.temporalStatus.box === 'OPEN') {
						dispatch(changeStatus(false, 'box', 'CLOSED'));
					}
					return;
				case 'BLUE':
					if (selectedItem === 'keyToBox') {
						dispatch(changeStatus(true, 'box', 'UNLOCKED'));
						dispatch(useItem('keyToBox'));
						dispatch(selectItem(null));
					} else if (status.retainedStatus.box === 'UNLOCKED' && status.temporalStatus.box === 'CLOSED') {
						dispatch(changeStatus(false, 'box', 'OPEN'));
					} else if (status.temporalStatus.box === 'OPEN' && items.screwdriver.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('screwdriver'));
					}
					return;
				default:
					return;
			}

		// view with desk
		case 'viewWithDesk':
			switch (location) {
				case 'LEFT':
					dispatch(changePerspective('viewWithWindow'));
					return;
				case 'RIGHT':
					dispatch(changePerspective('viewWithDoor'));
					return;
				case 'BLACK': // book
					dispatch(changePerspective('book'));
					return;
				case 'NAVY': // drawer
					dispatch(changePerspective('drawer'));
					return;
				case 'BLUE': // carpet
					dispatch(changePerspective('carpet'));
					return;
				case 'GREEN': // locker
					dispatch(changePerspective('locker'));
					return;
				default:
					return;
			}
		case 'book':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithDesk'));
					dispatch(resetTemporalStatus('book'));
					return;
				case 'BLACK': // book (right side)
					if (status.temporalStatus.book === 'CLOSED') {
						dispatch(changeStatus(false, 'book', 'OPEN'));
					}
					return;
				case 'NAVY': // book (left side)
					if (status.temporalStatus.book === 'OPEN') {
						dispatch(changeStatus(false, 'book', 'CLOSED'));
					}
					return;
				default:
					return;
			}
		case 'drawer':
			switch (mapIndex) {
				case '00':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK':
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY':
							if (selectedItem === 'keyToDrawer') {
								dispatch(changeStatus(true, 'upperDrawer', 'UNLOCKED'));
								dispatch(useItem('keyToDrawer'));
								dispatch(selectItem(null));
							} else if (status.retainedStatus.upperDrawer === 'UNLOCKED') {
								dispatch(changeStatus(false, 'drawer', 'UPPER_OPEN'));
							}
							return;
						case 'BLUE':
							dispatch(changeStatus(false, 'drawer', 'LOWER_OPEN'));
							return;
						default:
							return;
					}
				case '01':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK':
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY':
							dispatch(changeStatus(false, 'drawer', 'BOTH_CLOSED'));
							return;
						case 'BLUE':
							dispatch(changeStatus(false, 'drawer', 'LOWER_OPEN'));
							return;
						case 'GREEN':
							dispatch(changePerspective('upperDrawer'));
							return;
						default:
							return;
					}
				case '02':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK':
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY':
							if (selectedItem === 'keyToDrawer') {
								dispatch(changeStatus(true, 'upperDrawer', 'UNLOCKED'));
								dispatch(useItem('keyToDrawer'));
								dispatch(selectItem(null));
							} else if (status.retainedStatus.upperDrawer === 'UNLOCKED') {
								dispatch(changeStatus(false, 'drawer', 'UPPER_OPEN'));
							}
							return;
						case 'BLUE':
							dispatch(changeStatus(false, 'drawer', 'BOTH_CLOSED'));
							return;
						default:
							return;
					}
				default:
					return;
			}
		case 'upperDrawer':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('drawer'));
					return;
				default:
					return;
			}
		case 'carpet':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithDesk'));
					dispatch(resetTemporalStatus('carpet'));
					return;
				case 'BLACK':
					dispatch(changePerspective('book'));
					dispatch(resetTemporalStatus('carpet'));
					return;
				case 'NAVY':
					dispatch(changePerspective('drawer'));
					dispatch(resetTemporalStatus('carpet'));
					return;
				case 'BLUE':
					if (status.temporalStatus.carpet === 'LAID') {
						dispatch(changeStatus(false, 'carpet', 'FLIPPED'));
					}
					return;
				case 'GREEN':
					if (status.temporalStatus.carpet === 'FLIPPED') {
						dispatch(changeStatus(false, 'carpet', 'LAID'));
					}
					return;
				case 'TEAL':
					if (status.temporalStatus.carpet === 'LAID') {
						dispatch(changeStatus(false, 'carpet', 'FLIPPED'));
					} else if (status.temporalStatus.carpet === 'FLIPPED' && items.board2.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('board2'));
					}
					return;
				default:
					return;
			}
		case 'locker':
			switch (mapIndex) {
				case '00':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK':
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY':
							if (selectedItem === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
							}
							return;
						case 'BLUE':
							if (status.retainedStatus.locker2 === 'LOCKED') {
								dispatch(changePerspective('dial'));
							} else {
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'GREEN':
							if (status.retainedStatus.dialNumber.toString() === [3, 1, 4].toString()) { // flag
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'TEAL':
							if (selectedItem === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
							}
							return;
						default:
							return;
					}
				case '01':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK':
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY':
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							return;
						case 'BLUE':
							if (status.retainedStatus.locker2 === 'LOCKED') {
								dispatch(changePerspective('dial'));
							} else {
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'GREEN':
							if (status.retainedStatus.dialNumber.toString() === [3, 1, 4].toString()) { // flag
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'TEAL':
							if (selectedItem === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
							}
							return;
						case 'AZURE':
							if (items.tissue.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('tissue'));
							}
							return;
						case 'LIME':
							if (items.tissue.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('tissue'));
							} else {
								dispatch(changePerspective('tissue'));
							}
							return;
						default:
							return;
					}
				case '02':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK':
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY': // locker1
							if (selectedItem === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
							}
							return;
						case 'BLUE': // keyToDoor
							if (items.keyToDoor.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('keyToDoor'));
							}
							return;
						case 'GREEN':
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							return;
						case 'TEAL':
							if (selectedItem === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
							}
							return;
						default:
							return;
					}
				case '03':
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK':
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY':
							if (selectedItem === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								dispatch(selectItem(null));
							} else if (status.temporalStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
							}
							return;
						case 'BLUE':
							if (status.retainedStatus.locker2 === 'LOCKED') {
								dispatch(changePerspective('dial'));
							} else {
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'GREEN':
							if (status.retainedStatus.dialNumber.toString() === [3, 1, 4].toString()) { // flag
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
							}
							return;
						case 'TEAL':
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							return;
						case 'AZURE':
							if (items.board1.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('board1'));
							}
							return;
						default:
							return;
					}
				default:
					return;
			}
		case 'tissue':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('locker'));
					return;
				case 'BLACK': // keyToDrawer
					if (items.keyToDrawer.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToDrawer'));
					}
					return;
				default:
					return;
			}
		case 'dial':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('locker'));
					return;
				case 'BLACK': // the first digit
					dispatch(incrementDialNumber(0));
					return;
				case 'NAVY': // the second digit
					dispatch(incrementDialNumber(1));
					return;
				case 'BLUE': // the third digit
					dispatch(incrementDialNumber(2));
					return;
				default:
					return;
			}

		// view with door
		case 'viewWithDoor':
			switch (location) {
				case 'LEFT':
					dispatch(changePerspective('viewWithDesk'));
					return;
				case 'RIGHT':
					dispatch(changePerspective('viewWithSofa'));
					return;
				case 'BLACK': // door
					if (selectedItem === 'keyToDoor') {
						dispatch(changeStatus(true, 'door', 'UNLOCKED'));
						dispatch(useItem('keyToDoor'));
						dispatch(selectItem(null));
					} else if (status.retainedStatus.door === 'UNLOCKED') {
						dispatch(changeStatus(false, 'door', 'OPEN'));
					} else if (status.temporalStatus.door === 'CLOSED') {
						// sound
					} else {
						// game clear!
					}
					return;
				case 'NAVY': // opened door
					if (selectedItem === 'keyToDoor') {
						dispatch(changeStatus(true, 'door', 'UNLOCKED'));
						dispatch(useItem('keyToDoor'));
						dispatch(selectItem(null));
					} else if (status.retainedStatus.door === 'UNLOCKED') {
						dispatch(changeStatus(false, 'door', 'OPEN'));
					} else if (status.temporalStatus.door === 'OPEN') {
						dispatch(changeStatus(false, 'door', 'CLOSED'));
					} else {
						// sound
					}
					return;
				case 'BLUE': // hanging plant
					dispatch(changePerspective('hangingPlant'));
					return;
				default:
					return;
			}
		case 'hangingPlant':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('viewWithDoor'));
					return;
				case 'BLACK':
					if (selectedItem === 'stick') {
						dispatch(changeStatus(true, 'hangingPlant', 'KEY_FOUND'));
						dispatch(useItem('stick'));
						dispatch(selectItem(null));
					}
					return;
				case 'NAVY':
					if (selectedItem === 'stick') {
						dispatch(changeStatus(true, 'hangingPlant', 'KEY_FOUND'));
						dispatch(useItem('stick'));
						dispatch(selectItem(null));
					} else if (status.retainedStatus.hangingPlant === 'KEY_FOUND' && items.keyToBox.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToBox'));
					}
					return;
				default:
					return;
			}
		default:
			return;
	}
};

export default clickLocationToAction;