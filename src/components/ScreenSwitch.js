import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {nextScreen} from '../redux/modules/screen';
import {load} from '../redux/modules/gameControl';
import Game from './Game';
import StartScreen from './StartScreen';
import {loadAssets, sounds} from '../utils/AssetsLoader';

const screenStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%'
};

const ScreenSwitch = ({screen, onGameStart}) => (
	<div id="screen-switch" style={{
		position: 'relative',
		width: 590,
		height: 380,
		marginLeft: 'auto',
		marginRight: 'auto'
	}}>
		{screen === 'start' &&
			<div style={screenStyle}>
				<StartScreen style={screenStyle} onGameStart={onGameStart} />
			</div>
		}
		{screen === 'load' &&
			<div style={{
				...screenStyle,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				border: '1px solid gray'
			}}>
				<p style={{
					fontSize: '2rem',
					color: 'white'
				}}>Loading...</p>
			</div>
		}
		{screen === 'game' &&
			<div style={screenStyle}>
				<Game />
			</div>
		}
		{screen === 'end' &&
			<div style={{
				...screenStyle,
				backgroundColor: 'lightblue'
			}}>Congratulations!</div>
		}
		<div style={{ // fade
			...screenStyle,
			backgroundColor: 'transparent',
			pointerEvents: 'none'
		}}></div>
	</div>
);

ScreenSwitch.propTypes = {
	screen: PropTypes.string.isRequired,
	onGameStart: PropTypes.func.isRequired
};

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
			loadAssets(() => {
				sounds['start'].play();
				dispatch(nextScreen());
			});
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenSwitch);