import React from 'react'
import PropTypes from 'prop-types'

const ItemFrame = ({itemName, selected, onItemSelect}) => (
	<div
		className={itemName === null ? '' : 'item-frame-with-item'}
		style={{
			width: 45,
			height: 45,
			margin: 2,
			borderRadius: 5,
			backgroundColor: itemName === null ? '#555555' : 'white',
			border: '3px solid ' + selected ? 'orange' : 'transparent'
		}}
	>
		{itemName !== null && <img
			src={require(`../assets/images/items/${itemName}.png`)}
			onClick={() => onItemSelect(itemName)}
			alt=""
		/>}
	</div>
);

ItemFrame.propTypes = {
	selected: PropTypes.bool.isRequired,
	itemName: PropTypes.string, // nullable
	onItemSelect: PropTypes.func.isRequired
}

export default ItemFrame;