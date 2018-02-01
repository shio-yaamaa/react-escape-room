import {combineReducers} from 'redux';
import {screen} from './modules/screen';
import {gameControl} from './modules/gameControl';
import {items} from './modules/items';
import {selectedItem} from './modules/selectedItem';
import {itemStatus} from './modules/itemStatus';
import {status} from './modules/status';
import {perspective} from './modules/perspective';

const rootReducer = combineReducers({
	screen,
	gameControl,
	items,
	selectedItem,
  itemStatus,
	status,
	perspective
});

export default rootReducer;
