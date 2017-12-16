import React from 'react';
import PropTypes from 'prop-types';
import {arrowAreaWidth} from '../constants/constants';
import arrowImage from '../assets/images/arrow.svg';

class ArrowArea extends React.Component {
	startAnimation() {
		this.arrow.classList.add('arrow-animation');
	}

	stopAnimation() {
		this.arrow.classList.remove('arrow-animation');
	}

	directionToAttrs(direction) {
		switch (direction) {
			case 'UP':
				return ['top', 'left'];
			case 'DOWN':
				return ['bottom', 'left'];
			default: // includes 'LEFT' and 'RIGHT'
				return ['top', direction.toLowerCase()];
		}
	}

	directionToDeg(direction) {
		switch (direction) {
			case 'UP':
				return '0deg';
			case 'DOWN':
				return '180deg';
			case 'LEFT':
				return '-90deg';
			case 'RIGHT':
				return '90deg';
			default:
				return;
		}
	}
	
	render() {
		const isSide = this.props.direction === 'LEFT'
			|| this.props.direction === 'RIGHT';
		const style = {
			position: 'absolute',
			width: isSide ? arrowAreaWidth : '100%',
			height: isSide ? '100%' : arrowAreaWidth,
			border: '1px solid black'
		};
		this.directionToAttrs(this.props.direction).forEach(attr => {
			style[attr] = 0;
		});

		return (
			<div
				style={style}
				onClick={() => this.props.onArrowClick(this.props.direction)}
				onMouseOver={() => this.startAnimation()}
				onMouseLeave={() => this.stopAnimation()}
			>
				<img
					ref={arrow => this.arrow = arrow}
					src={arrowImage}
					style={{transform: `rotate(${this.directionToDeg(this.props.direction)})`}}
					alt=""
				/>
			</div>
		);
	}
}

ArrowArea.propTypes = {
	direction: PropTypes.string.isRequired,
	onArrowClick: PropTypes.func.isRequired
};

export default ArrowArea;