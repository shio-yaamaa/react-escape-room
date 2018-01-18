import React from 'react';
import PropTypes from 'prop-types';

const Hint = ({hint, onHintCancel}) => (
	<div style={{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	}} onClick={onHintCancel}>
		<div style={{
			width: '70%',
			height: 'auto',
			maxHeight: '80%',
			padding: 20,
			borderRadius: 5,
			backgroundColor: 'rgba(255, 255, 255, 0.8)',
			boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.3)',
			overflow: 'auto'
		}} onClick={(event) => {event.stopPropagation()}}>
			{hint}
		</div>
	</div>
);

Hint.propTypes = {
	hint: PropTypes.string.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

export default Hint;