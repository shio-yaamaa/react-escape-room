import React from 'react';
import {loadingAnimationRadius, loadingCircleSize} from '../constants/constants';

const LoadScreen = () => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	}}>
		<p style={{
			fontSize: '1.5rem',
			color: 'white'
		}}>Loading...</p>
		<div style={{
			position: 'relative',
			width: loadingAnimationRadius * 2,
			height: loadingAnimationRadius * 2
		}}>
			{[0, 0.1, 0.2, 0.3].map((delayTime, index) => (
				<div key={index} className="loadingCircle" style={{
					position: 'absolute',
				  left: 0,
				  right: 0,
				  width: loadingCircleSize,
				  height: loadingCircleSize,
					margin: '0 auto',
					borderRadius: '50%',
					backgroundColor: 'white',
					transformOrigin: `50% ${loadingAnimationRadius}px`,
					animation: 'loading-animation 2s infinite ease-in-out',
					animationDelay: delayTime + 's'
				}}></div>
			))}
		</div>
	</div>
);

export default LoadScreen;