import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {nextScreen} from '../redux/modules/screen';
import {load} from '../redux/modules/gameControl';
import Game from './Game';
import {loadAssets} from '../utils/AssetsLoader';

// Component

const ScreenSwitch = ({screen, onGameStart, onAssetsLoadDone, onGameEnd}) => (
	<div id="screen-switch" style={{
		width: 590,
		height: 380,
		marginLeft: 'auto',
		marginRight: 'auto'
	}}>
		{screen === 'start' &&
			<div style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'lightgray'
			}}>
				<p onClick={() => onGameStart(true)}>New</p>
				<p onClick={() => onGameStart(false)}>Load</p>
			</div>
		}
		{screen === 'load' &&
			<div style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'lightgray'
			}}>loading...</div>
		}
		{screen === 'game' && <Game />}
		{screen === 'end' &&
			<div style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'lightblue'
			}}>Congratulations!</div>
		}
	</div>
);

ScreenSwitch.propTypes = {
	screen: PropTypes.string.isRequired,
	onGameStart: PropTypes.func.isRequired,
	onAssetsLoadDone: PropTypes.func.isRequired,
	onGameEnd: PropTypes.func.isRequired
};

// Container

const mapStateToProps = state => {
	return {
		screen: state.screen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGameStart: isNew => {
			if (!isNew) {
				dispatch(load(JSON.parse(localStorage.getItem('savedData'))));
			}
			dispatch(nextScreen());
			// dispatchしてstateが変わったら、下のコードは実行されるのか？
			loadAssets(() => dispatch(nextScreen()));
		},
		onAssetsLoadDone: () => {
			dispatch(nextScreen());
		},
		onGameEnd: () => {
			dispatch(nextScreen());
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenSwitch);