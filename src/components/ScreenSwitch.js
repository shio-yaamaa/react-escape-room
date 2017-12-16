import React from 'react';
import GameContainer from '../containers/GameContainer';

class ScreenSwitch extends React.Component {
	render() {
		return (
			<div style={{
				width: 590,
				height: 380,
				marginLeft: 'auto',
				marginRight: 'auto'
			}}>
				<GameContainer />
			</div>
		);
	}

	startGame(isNew) {
		return;
	}

	endGame() {
		return;
	}
}

export default ScreenSwitch;