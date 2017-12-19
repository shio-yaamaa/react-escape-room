import React from 'react';
import PropTypes from 'prop-types';
import MainScreenContainer from '../containers/MainScreenContainer';
import Sidebar from './Sidebar';
import Hint from './Hint';

//import stick from '../assets/images/items/stick.png';

const Game = ({selectedItem, isSaved, hint, onSaveClick, onHintClick, onHintCancel}) => (
	<div style={{
		position: 'relative',
		width: '100%',
		height: '100%'/*,
		cursor: `url(${stick}) 40 40, auto`*/
	}}>
		<div style={{
			display: 'flex',
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%'
		}}>
			<MainScreenContainer />
			<Sidebar
				onSaveClick={onSaveClick}
				onHintClick={onHintClick}
			/>
		</div>
		{hint !== null && <Hint hint={hint} onHintCancel={onHintCancel} />}
		<div id="save_effect" style={{
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			pointerEvents: 'none'
		}}></div>
	</div>
);

Game.propTypes = {
	selectedItem: PropTypes.string, // nullable
	isSaved: PropTypes.bool.isRequired,
	hint: PropTypes.string, // nullable
	onSaveClick: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

export default Game;