import React from 'react';
import PropTypes from 'prop-types';
import ItemFrameContainer from '../containers/ItemFrameContainer';

const Sidebar = ({onSaveClick, onHintClick}) => (
	<div style={{
		width: 110,
		height: '100%'
	}}>
		<ItemFrameContainer />
		<div style={{
			display: 'flex'
		}}>
			<div className="button" onClick={onSaveClick}>Save</div>
			<div className="button" onClick={onHintClick}>Hint</div>
		</div>
	</div>
);

Sidebar.propTypes = {
	onSaveClick: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired
};

export default Sidebar;