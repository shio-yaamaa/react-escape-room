import React from 'react'
import PropTypes from 'prop-types'
import {itemFrameSize} from '../constants/constants';

const ItemFrame = ({itemName, selected, onItemSelect}) => (
	<div
		className={
			itemName === null
				? 'empty-item-frame'
				: (selected ? 'selected-item-frame' : 'unselected-item-frame')
		}
		style={{
			boxSizing: 'content-box',
			width: itemFrameSize,
			height: itemFrameSize,
			margin: 2,
			borderRadius: 5
		}}
		onClick={() => {
			if (itemName !== null) {
				onItemSelect(itemName);
			}
		}}
	>
		{itemName !== null && <img
			src={require(`../assets/images/items/${itemName}.png`)}
			width={itemFrameSize}
			style={{
				pointerEvents: 'none'
			}}
			alt=""
		/>}
	</div>
);

ItemFrame.propTypes = {
	selected: PropTypes.bool.isRequired,
	itemName: PropTypes.string, // nullable
	onItemSelect: PropTypes.func.isRequired
};

export default ItemFrame;