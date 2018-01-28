import React from 'react';
import PropTypes from 'prop-types';
import {itemFrameSize, itemFrameMargin} from '../constants/constants';
import {itemImages} from '../utils/AssetsLoader';

const ItemFrame = ({itemName, selected, onItemSelect}) => (
	<div
		className={selected ? 'selected-item-frame' : 'unselected-item-frame'}
		style={{
			width: itemFrameSize,
			height: itemFrameSize,
			margin: itemFrameMargin,
			borderRadius: 5
		}}
		onClick={() => {
			if (itemName !== null) {
				onItemSelect(itemName);
			}
		}}
	>
		{itemName !== null && <img
			src={itemImages[itemName].src}
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
