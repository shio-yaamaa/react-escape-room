import React from 'react';
import PropTypes from 'prop-types';
import {arrowAreaWidth, arrowSize} from '../constants/constants';
import arrowImage from '../assets/images/arrow.svg';

class ArrowArea extends React.Component {
	startAnimation(direction) {
		this.arrow.classList.add(direction.toLowerCase() + '-arrow-animation');
	}

	stopAnimation(direction) {
		this.arrow.classList.remove(direction.toLowerCase() + '-arrow-animation');
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
			display: 'flex',
  		justifyContent: 'center',
  		alignItems: 'center',
			position: 'absolute',
			width: isSide ? arrowAreaWidth : '100%',
			height: isSide ? '100%' : arrowAreaWidth
		};
		this.directionToAttrs(this.props.direction).forEach(attr => {
			style[attr] = 0;
		});

		return (
			<div
				style={style}
				onClick={() => this.props.onArrowClick(this.props.direction)}
				onMouseOver={() => this.startAnimation(this.props.direction)}
				onMouseLeave={() => this.stopAnimation(this.props.direction)}
			>
				<img
					ref={arrow => this.arrow = arrow}
					src={arrowImage}
					width={arrowSize}
					style={{
						display: 'block',
						transform: `rotate(${this.directionToDeg(this.props.direction)})`
					}}
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