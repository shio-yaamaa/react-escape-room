import React from 'react';
import PropTypes from 'prop-types';

const Hint = ({hint, onHintCancel}) => (
	<div style={{
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	}} onClick={onHintCancel}>
		<div style={{
			width: '60%',
			height: '80%',
			margin: 'auto',
			padding: 20,
			backgroundColor: 'white'
		}}>
			{hint}
		</div>
	</div>
);

Hint.propTypes = {
	hint: PropTypes.string.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

export default Hint;