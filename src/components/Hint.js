import React from 'react';
import PropTypes from 'prop-types';
import {wholeScreenWidth, hintPadding, hintBorderRadius} from '../constants/constants';
import {behindHintColor, hintBackgroundColor} from '../constants/colors';

const Hint = ({hint, onHintCancel}) => (
	<div style={{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: wholeScreenWidth,
		height: '100%',
		backgroundColor: behindHintColor
	}} onClick={onHintCancel}>
		<div style={{
			width: '70%',
			height: 'auto',
			maxHeight: '80%',
			padding: hintPadding,
			borderRadius: hintBorderRadius,
			backgroundColor: hintBackgroundColor,
			boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.3)',
			overflow: 'auto'
		}} onClick={event => event.stopPropagation()}>
			{hint}
		</div>
	</div>
);

Hint.propTypes = {
	hint: PropTypes.string.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

export default Hint;
