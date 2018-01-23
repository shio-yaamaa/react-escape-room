import React from 'react';
import PropTypes from 'prop-types';

const canLoad = () => localStorage.getItem('savedData') !== null;

const getStartButtonStyle = (isEnabled) => ({
	padding: '0.4rem 1.2rem',
	borderRadius: '0.3rem',
	color: `rgba(0, 0, 0, ${isEnabled ? 0.95 : 0.5})`,
	backgroundColor: isEnabled ? '#FF9800' : 'lightgray',
	cursor: isEnabled ? 'pointer' : 'auto'
});

const StartScreen = ({onGameStart}) => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		border: '1px solid gray'
	}}>
		<p style={{
			paddingBottom: '2rem',
			fontSize: '2rem',
			color: 'white'
		}}>Escape Room with React</p>
		<p
			className="start-button enabled"
			style={getStartButtonStyle(true)}
			onClick={() => onGameStart(true)}
		>New</p>
		<p
			className={'start-button' + (canLoad() ? ' enabled' : '')}
			style={getStartButtonStyle(canLoad())}
			onClick={() => {
				if (canLoad()) {
					onGameStart(false);
				}}
			}
		>Load</p>
	</div>
);

StartScreen.propTypes = {
	onGameStart: PropTypes.func.isRequired
}

export default StartScreen;