import React from 'react';
import {endScreenBackground} from '../utils/AssetsLoader';
import {screenBorderRadius} from '../constants/constants';

const EndScreen = () => (
	<div style={{
		position: 'relative',
		width: '100%',
		height: '100%'
	}}>
		<img src={endScreenBackground.src} style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
      borderRadius: screenBorderRadius
		}} alt="" />
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			top: 0,
			bottom: 0,
			width: '100%',
			height: '60%',
			margin: 'auto 0',
			backgroundColor: 'rgba(255, 236, 179, 0.6)'
		}}>
			<p style={{
				margin: 0,
				fontSize: '3.4rem',
				color: '#FF5722',
				textShadow: '2px 2px 2px rgba(0, 0, 0, 0.4)'
			}}>脱出成功</p>
			<p style={{
				margin: '1.7rem 0 0',
				fontSize: '1.4rem',
				color: '#795548'
			}}>Congratulations!</p>
		</div>
	</div>
);

export default EndScreen;
