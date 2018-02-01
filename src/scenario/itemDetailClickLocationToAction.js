import {combineItems} from '../redux/modules/items';
import {changeItemStatus} from '../redux/modules/itemStatus';
import {sounds} from '../utils/AssetsLoader';

const playSound = (filename) => {
	sounds[filename].play();
};

const itemDetailClickLocationToAction = (dispatch, itemName, mapIndex, location, itemStatus, itemInHand) => {
	switch (itemName) {
    case 'board1':
      switch (location) {
        case 'BLACK': // whole image
          if (itemInHand === 'board2') {
            playSound('obtainItem');
            dispatch(combineItems(itemInHand, itemName, 'boards'));
          }
          return;
        default:
          return;
      }
    case 'board2':
      switch (location) {
        case 'BLACK': // whole image
          if (itemInHand === 'board1') {
            playSound('obtainItem');
            dispatch(combineItems(itemInHand, itemName, 'boards'));
          }
          return;
        default:
          return;
      }
    case 'tissue':
      switch (location) {
        case 'BLACK': // tissue
          if (!itemStatus.retainedStatus.isTissueBall) {
            playSound('tissueToBall');
            dispatch(changeItemStatus(true, 'isTissueBall', true));
          }
          return;
        default:
          return;
      }
    default:
      return;
  }
};

export default itemDetailClickLocationToAction;
