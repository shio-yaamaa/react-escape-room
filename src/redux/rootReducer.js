import {combineReducers} from 'redux';
import {items} from './modules/items';
import {selectedItem} from './modules/selectedItem';
import {status} from './modules/status';
import {perspective} from './modules/perspective';
import {gameControl} from './modules/gameControl';

const rootReducer = combineReducers({
	items,
	selectedItem,
	status,
	perspective,
	gameControl
});

export default rootReducer;