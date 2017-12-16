import React from 'react';
import PropTypes from 'prop-types';
import MainScreenContainer from '../containers/MainScreenContainer';
import Sidebar from './Sidebar';
import Hint from './Hint';

const Game = ({isSaved, hint, onSaveClick, onHintClick, onHintCancel}) => (
	<div style={{
		position: 'relative',
		width: '100%',
		height: '100%'
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
	isSaved: PropTypes.bool.isRequired,
	hint: PropTypes.string, // nullable
	onSaveClick: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

export default Game;