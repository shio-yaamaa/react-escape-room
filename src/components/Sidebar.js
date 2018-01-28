import React from 'react';
import PropTypes from 'prop-types';
import ItemFrameContainer from './ItemFrameContainer';
import {marginBetweenMainScreenAndSidebar, itemFrameSize, itemFrameMargin, sidebarWidth} from '../constants/constants';

const buttonStyle = {
	width: itemFrameSize + itemFrameMargin,
	paddingTop: 5,
	paddingBottom: 5,
	textAlign: 'center',
  verticalAlign: 'middle',
  color: 'white',
  cursor: 'pointer'
};

const Sidebar = ({onSaveClick, onHintClick}) => (
	<div style={{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: sidebarWidth,
		height: '100%',
    marginLeft: marginBetweenMainScreenAndSidebar
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
