import {startMotion} from '../redux/modules/gameControl';
import {changePerspective} from '../redux/modules/perspective';
import {changeStatus, incrementDialNumber, resetTemporalStatus} from '../redux/modules/status';
import {obtainItem, useItem} from '../redux/modules/items';
import isDialNumberCorrect from '../utils/isDialNumberCorrect';
import {sounds} from '../utils/AssetsLoader';

// ignore any clicks while in motions
// mapIndex are not int but string

const stickMotion = [
  {
    mainViewImage: 'hangingPlant_01',
    duration: 1500
  }
];

const playSound = (filename) => {
	sounds[filename].play();
};

const clickLocationToAction = (dispatch, perspective, mapIndex, location, status, items, itemInHand, isInMotion, onGameEnd) => {
  if (isInMotion) {
    return;
  }
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
				case 'BLACK': // soil
					if (itemInHand === 'tissue' && status.retainedStatus.soil === 'ON_PLANTER') {
						dispatch(changeStatus(true, 'soil', 'WIPED'));
						dispatch(useItem('tissue'));
						playSound('wipeSoil');
					} else if (status.retainedStatus.soil === 'WIPED' && items.keyToLocker3.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToLocker3'));
						playSound('obtainItem');
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
							if (itemInHand === 'screwdriver') {
								dispatch(changeStatus(true, 'picture', 'UNSCREWED'));
								dispatch(useItem('screwdriver'));
								playSound('unscrew');
							}
							return;
						case 'UNSCREWED':
							dispatch(changeStatus(true, 'picture', 'DETACHED'));
							playSound('detachPicture');
							return;
						default:
							return;
					}
				case 'NAVY': // picture
					if (status.retainedStatus.picture === 'UNSCREWED') {
						dispatch(changeStatus(true, 'picture', 'DETACHED'));
						playSound('detachPicture');
					}
					return;
				case 'BLUE': // keyToLocker1
					switch (status.retainedStatus.picture) {
						case 'UNSCREWED':
							dispatch(changeStatus(true, 'picture', 'DETACHED'));
							playSound('detachPicture');
							return;
						case 'DETACHED':
							if (items.keyToLocker1.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('keyToLocker1'));
								playSound('obtainItem');
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
						playSound('obtainItem');
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
				case 'BLACK': // outer part of window
					if (status.retainedStatus.window === 'CURTAIN_CLOSED') {
						dispatch(changeStatus(true, 'window', 'CURTAIN_OPEN'));
						playSound('curtain');
					} else if (status.retainedStatus.window === 'CURTAIN_OPEN') { // Boardがあるときはカーテン閉められない
						dispatch(changeStatus(true, 'window', 'CURTAIN_CLOSED'));
						playSound('curtain');
					}
					return;
				case 'NAVY': // inner part of window
					switch (status.retainedStatus.window) {
						case 'CURTAIN_CLOSED':
							dispatch(changeStatus(true, 'window', 'CURTAIN_OPEN'));
							playSound('curtain');
							return;
						case 'CURTAIN_OPEN':
							if (itemInHand === 'board1') {
								dispatch(changeStatus(true, 'window', 'BOARD1'));
								dispatch(useItem('board1'));
								playSound('board');
							} else if (itemInHand === 'board2') {
								dispatch(changeStatus(true, 'window', 'BOARD2'));
								dispatch(useItem('board2'));
								playSound('board');
							} else if (itemInHand === 'boards') {
                dispatch(changeStatus(true, 'window', 'BOARD1_2'));
								dispatch(useItem('boards'));
								playSound('board');
              }
							return;
						case 'BOARD1':
							if (itemInHand === 'board2') {
								dispatch(changeStatus(true, 'window', 'BOARD1_2'));
								dispatch(useItem('board2'));
								playSound('board');
							}
							return;
						case 'BOARD2':
							if (itemInHand === 'board1') {
								dispatch(changeStatus(true, 'window', 'BOARD2_1'));
								dispatch(useItem('board1'));
								playSound('board');
							}
							return;
						default:
							return;
					}
				case 'BLUE': // box
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
				case 'BLACK': // lower part of the box
					if (itemInHand === 'keyToBox') {
						dispatch(changeStatus(true, 'box', 'UNLOCKED'));
						dispatch(useItem('keyToBox'));
						playSound('unlock');
					} else if (status.retainedStatus.box === 'LOCKED') {
						playSound('locked');
					} else if (status.temporalStatus.box === 'CLOSED') {
						dispatch(changeStatus(false, 'box', 'OPEN'));
						playSound('openBox');
					}
					return;
				case 'NAVY': // the lid of the box
					if (status.temporalStatus.box === 'OPEN') {
						dispatch(changeStatus(false, 'box', 'CLOSED'));
						playSound('closeBox');
					}
					return;
				case 'BLUE': // screwdriver
					if (itemInHand === 'keyToBox') {
						dispatch(changeStatus(true, 'box', 'UNLOCKED'));
						dispatch(useItem('keyToBox'));
						playSound('unlock');
					} else if (status.retainedStatus.box === 'LOCKED') {
						playSound('locked');
					} else if (status.temporalStatus.box === 'CLOSED') {
						dispatch(changeStatus(false, 'box', 'OPEN'));
						playSound('openBox');
					} else if (items.screwdriver.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('screwdriver'));
						playSound('obtainItem');
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
						playSound('openBook');
					}
					return;
				case 'NAVY': // book (left side)
					if (status.temporalStatus.book === 'OPEN') {
						dispatch(changeStatus(false, 'book', 'CLOSED'));
						playSound('closeBook');
					}
					return;
				default:
					return;
			}
		case 'drawer':
			switch (mapIndex) {
				case '00': // both drawers are closed
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK': // book
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY': // upper drawer
							if (itemInHand === 'keyToDrawer') {
								dispatch(changeStatus(true, 'upperDrawer', 'UNLOCKED'));
								dispatch(useItem('keyToDrawer'));
								playSound('unlock');
							} else if (status.retainedStatus.upperDrawer === 'UNLOCKED') {
								dispatch(changeStatus(false, 'drawer', 'UPPER_OPEN'));
								playSound('openDrawer');
							} else {
								playSound('locked');
							}
							return;
						case 'BLUE': // lower drawer
							dispatch(changeStatus(false, 'drawer', 'LOWER_OPEN'));
							playSound('openDrawer');
							return;
						default:
							return;
					}
				case '01': // upper drawer is open
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK': // book
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY': // upper drawer
							dispatch(changeStatus(false, 'drawer', 'BOTH_CLOSED'));
							playSound('closeDrawer');
							return;
						case 'BLUE': // lower drawer
							dispatch(changeStatus(false, 'drawer', 'LOWER_OPEN'));
							playSound('openDrawer');
							return;
						case 'GREEN': // inside of the upper drawer
							dispatch(changePerspective('upperDrawer'));
							return;
						default:
							return;
					}
				case '02': // lower drawer is open
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'BLACK': // book
							dispatch(changePerspective('book'));
							dispatch(resetTemporalStatus('drawer'));
							return;
						case 'NAVY': // upper drawer
							if (itemInHand === 'keyToDrawer') {
								dispatch(changeStatus(true, 'upperDrawer', 'UNLOCKED'));
								dispatch(useItem('keyToDrawer'));
								playSound('unlock');
							} else if (status.retainedStatus.upperDrawer === 'UNLOCKED') {
								dispatch(changeStatus(false, 'drawer', 'UPPER_OPEN'));
								playSound('openDrawer');
							} else {
								playSound('locked');
							}
							return;
						case 'BLUE': // lower drawer
							dispatch(changeStatus(false, 'drawer', 'BOTH_CLOSED'));
							playSound('closeDrawer');
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
				case 'BLACK': // book
					dispatch(changePerspective('book'));
					dispatch(resetTemporalStatus('carpet'));
					return;
				case 'NAVY': // drawer
					dispatch(changePerspective('drawer'));
					dispatch(resetTemporalStatus('carpet'));
					return;
				case 'BLUE': // the edge of the carpet
					if (status.temporalStatus.carpet === 'LAID') {
						dispatch(changeStatus(false, 'carpet', 'FLIPPED'));
						playSound('flipCarpet');
					}
					return;
				case 'GREEN': // the edge of the flipped carpet
					if (status.temporalStatus.carpet === 'FLIPPED') {
						dispatch(changeStatus(false, 'carpet', 'LAID'));
						playSound('layCarpet');
					}
					return;
				case 'TEAL': // board2
					if (status.temporalStatus.carpet === 'LAID') {
						dispatch(changeStatus(false, 'carpet', 'FLIPPED'));
						playSound('flipCarpet');
					} else if (status.temporalStatus.carpet === 'FLIPPED' && items.board2.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('board2'));
						playSound('obtainItem');
					}
					return;
				default:
					return;
			}
		case 'locker':
			switch (mapIndex) {
				case '00': // all lockers are closed
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
							if (itemInHand === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								playSound('unlock');
							} else if (status.retainedStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'BLUE': // dial of locker2
							dispatch(changePerspective('dial'));
							return;
						case 'GREEN': // locker2
							if (isDialNumberCorrect(status.retainedStatus.dialNumber)
								&& (status.retainedStatus.window === 'BOARD1_2' || status.retainedStatus.window === 'BOARD2_1')) {
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
									playSound('unlock'); // ?
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'TEAL': // locker3
							if (itemInHand === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								playSound('unlock');
							} else if (status.retainedStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						default:
							return;
					}
				case '01': // locker1 is open
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK': // carpet
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY': // locker1
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							playSound('closeLocker');
							return;
						case 'BLUE': // dial of locker2
							dispatch(changePerspective('dial'));
							return;
						case 'GREEN': // locker2
							if (isDialNumberCorrect(status.retainedStatus.dialNumber)
								&& (status.retainedStatus.window === 'BOARD1_2' || status.retainedStatus.window === 'BOARD2_1')) {
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
									playSound('unlock');
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'TEAL': // locker3
							if (itemInHand === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								playSound('unlock');
							} else if (status.retainedStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'AZURE': // tissue
							if (items.tissue.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('tissue'));
                playSound('tissue');
								playSound('obtainItem');
							}
							return;
						case 'LIME': // tissue box
							if (items.tissue.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('tissue'));
                playSound('tissue');
								playSound('obtainItem');
							} else {
								dispatch(changePerspective('tissueBox'));
							}
							return;
						default:
							return;
					}
				case '02': // locker2 is open
					switch (location) {
						case 'DOWN':
							dispatch(changePerspective('viewWithDesk'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'BLACK': // carpet
							dispatch(changePerspective('carpet'));
							dispatch(resetTemporalStatus('locker'));
							return;
						case 'NAVY': // locker1
							if (itemInHand === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								playSound('unlock');
							} else if (status.retainedStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'BLUE': // keyToDoor
							if (items.keyToDoor.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('keyToDoor'));
								playSound('obtainItem');
							}
							return;
						case 'GREEN': // locker2
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							playSound('closeLocker');
							return;
						case 'TEAL': // locker3
							if (itemInHand === 'keyToLocker3') {
								dispatch(changeStatus(true, 'locker3', 'UNLOCKED'));
								dispatch(useItem('keyToLocker3'));
								playSound('unlock');
							} else if (status.retainedStatus.locker3 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER3_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						default:
							return;
					}
				case '03': // locker3 is open
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
							if (itemInHand === 'keyToLocker1') {
								dispatch(changeStatus(true, 'locker1', 'UNLOCKED'));
								dispatch(useItem('keyToLocker1'));
								playSound('unlock');
							} else if (status.retainedStatus.locker1 === 'UNLOCKED') {
								dispatch(changeStatus(false, 'locker', 'LOCKER1_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'BLUE': // dial of locker2
							dispatch(changePerspective('dial'));
							return;
						case 'GREEN': // locker2
							if (isDialNumberCorrect(status.retainedStatus.dialNumber)
								&& (status.retainedStatus.window === 'BOARD1_2' || status.retainedStatus.window === 'BOARD2_1')) {
								if (status.retainedStatus.locker2 === 'LOCKED') {
									dispatch(changeStatus(true, 'locker2', 'UNLOCKED'));
									playSound('unlock');
								}
								dispatch(changeStatus(false, 'locker', 'LOCKER2_OPEN'));
								playSound('openLocker');
							} else {
								playSound('locked');
							}
							return;
						case 'TEAL': // locker3
							dispatch(changeStatus(false, 'locker', 'ALL_CLOSED'));
							playSound('closeLocker');
							return;
						case 'AZURE': // board1
							if (items.board1.obtainStatus === 'NOT_OBTAINED') {
								dispatch(obtainItem('board1'));
								playSound('obtainItem');
							}
							return;
						default:
							return;
					}
				default:
					return;
			}
		case 'tissueBox':
			switch (location) {
				case 'DOWN':
					dispatch(changePerspective('locker'));
					return;
				case 'BLACK': // keyToDrawer
					if (items.keyToDrawer.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToDrawer'));
						playSound('obtainItem');
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
					playSound('dial');
					return;
				case 'NAVY': // the second digit
					dispatch(incrementDialNumber(1));
					playSound('dial');
					return;
				case 'BLUE': // the third digit
					dispatch(incrementDialNumber(2));
					playSound('dial');
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
					if (itemInHand === 'keyToDoor') {
						dispatch(changeStatus(true, 'door', 'UNLOCKED'));
						dispatch(useItem('keyToDoor'));
						playSound('unlock');
					} else if (status.retainedStatus.door === 'LOCKED') {
						playSound('locked');
					} else if (status.temporalStatus.door === 'CLOSED') { // UNLOCKED & CLOSED
						dispatch(changeStatus(false, 'door', 'OPEN'));
						playSound('door');
					} else { // UNLOCKED & OPEN
						onGameEnd();
					}
					return;
				case 'NAVY': // opened part of door
					if (itemInHand === 'keyToDoor') {
						dispatch(changeStatus(true, 'door', 'UNLOCKED'));
						dispatch(useItem('keyToDoor'));
						playSound('unlock');
					} else if (status.retainedStatus.door === 'LOCKED') {
						playSound('locked');
					} else if (status.temporalStatus.door === 'CLOSED') { // UNLOCKED & CLOSED
						dispatch(changeStatus(false, 'door', 'OPEN'));
						playSound('door');
					} else { // UNLOCKED & OPEN
						dispatch(changeStatus(false, 'door', 'CLOSED'));
						playSound('door');
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
				case 'BLACK': // where stick can stick
					if (itemInHand === 'stick') {
						playSound('stick');
            dispatch(startMotion(stickMotion, () => {
              dispatch(changeStatus(true, 'hangingPlant', 'KEY_FOUND'));
  						dispatch(useItem('stick'));
            }));
					}
					return;
				case 'NAVY': // keyToBox
					if (itemInHand === 'stick') {
						playSound('stick');
            dispatch(startMotion(stickMotion, () => {
              dispatch(changeStatus(true, 'hangingPlant', 'KEY_FOUND'));
  						dispatch(useItem('stick'));
            }));
					} else if (status.retainedStatus.hangingPlant === 'KEY_FOUND' && items.keyToBox.obtainStatus === 'NOT_OBTAINED') {
						dispatch(obtainItem('keyToBox'));
						playSound('obtainItem');
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
