import React from 'react';
import PropTypes from 'prop-types';
import ItemFrameContainer from '../containers/ItemFrameContainer';
import {itemFrameSize, itemFrameMargin} from '../constants/constants';

const buttonStyle = {
	width: itemFrameSize + itemFrameMargin * 2,
	paddingTop: 5,
	paddingBottom: 5
};

const Sidebar = ({onSaveClick, onHintClick}) => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: 110,
		height: '100%'
	}}>
		<ItemFrameContainer />
		<div style={{
			display: 'flex',
			justifyContent: 'center'
		}}>
			<div className="button" style={buttonStyle} onClick={onSaveClick}>Save</div>
			<div className="button" style={buttonStyle} onClick={onHintClick}>Hint</div>
		</div>
	</div>
);

Sidebar.propTypes = {
	onSaveClick: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired
};

export default Sidebar;