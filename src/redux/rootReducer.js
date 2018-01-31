import {combineReducers} from 'redux';
import {screen} from './modules/screen';
import {gameControl} from './modules/gameControl';
import {items} from './modules/items';
import {selectedItem} from './modules/selectedItem';
import {itemDetailStatus} from './modules/itemDetailStatus';
import {status} from './modules/status';
import {perspective} from './modules/perspective';

const rootReducer = combineReducers({
	screen,
	gameControl,
	items,
	selectedItem,
  itemDetailStatus,
	status,
	perspective
});

export default rootReducer;
