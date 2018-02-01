import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {nextScreen} from '../redux/modules/screen';
import {load} from '../redux/modules/gameControl';
import Game from './Game';
import StartScreen from './StartScreen';
import LoadScreen from './LoadScreen';
import EndScreen from './EndScreen';
import {loadAssets, sounds} from '../utils/AssetsLoader';
import {screenBorderRadius, marginBetweenMainScreenAndSidebar,
  mainScreenWidth, mainScreenHeight, sidebarWidth} from '../constants/constants';
import {backgroundBlack} from '../constants/colors';

class ScreenSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.screenStyle = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		};
	}

	startFading(color, duration, callback) {
		this.fade.style.backgroundColor = color;
		const framePerMillisecond = 24 / 1000; // 24fps
		let currentFrame = 0;
		const middleFrame = framePerMillisecond * duration / 2;
		const interval = setInterval(() => {
			currentFrame++;
			this.fade.style.opacity = 1 - Math.abs((currentFrame / middleFrame - 1) ** 3) // cubic easing
			if (currentFrame === Math.round(middleFrame)) {
				callback.call();
			}
			if (currentFrame > framePerMillisecond * duration) { // animation end
				clearInterval(interval);
			}
		}, 1 / framePerMillisecond);
	}

	handleGameStart(isNew) {
		this.props.nextScreen();
		if (!isNew) {
			this.props.loadSavedData();
		}
		loadAssets(() => {
			this.startFading(backgroundBlack, 1000, () => {
				sounds['start'].play();
				this.props.nextScreen();
			});
		});
	}

	handleGameEnd() {
		this.startFading('white', 1800, () => {
			this.props.nextScreen();
			sounds['end'].play();
		});
	}

	render() {
		return (
			<div id="screen-switch" style={{
				position: 'relative',
				width: marginBetweenMainScreenAndSidebar + mainScreenWidth + sidebarWidth,
				height: mainScreenHeight,
				marginLeft: 'auto',
				marginRight: 'auto'
			}}>
				{this.props.screen === 'start' &&
					<div style={this.screenStyle}>
						<StartScreen onGameStart={isNew => this.handleGameStart.call(this, isNew)} />
					</div>
				}
				{this.props.screen === 'load' &&
					<div style={this.screenStyle}><LoadScreen /></div>
				}
				{this.props.screen === 'game' &&
					<div style={this.screenStyle}>
						<Game onGameEnd={this.handleGameEnd.bind(this)} />
					</div>
				}
				{this.props.screen === 'end' &&
					<div style={this.screenStyle}><EndScreen /></div>
				}
				<div ref={fade => this.fade = fade} style={{
					...this.screenStyle,
          borderRadius: screenBorderRadius,
					opacity: 0,
					pointerEvents: 'none'
				}}></div>
			</div>
		);
	}
}

ScreenSwitch.propTypes = {
	screen: PropTypes.string.isRequired,
	loadSavedData: PropTypes.func.isRequired,
	nextScreen: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		screen: state.screen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadSavedData: () => {
			dispatch(load(JSON.parse(localStorage.getItem('savedData'))));
		},
		nextScreen: () => {
			dispatch(nextScreen());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenSwitch);
