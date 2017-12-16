import React from 'react';
import PropTypes from 'prop-types';
import ItemFrame from './ItemFrame';

const ItemFrameRenderer = ({itemFrames, onItemSelect}) => (
	<div style={{
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
		height: '90%'
	}}>
		{itemFrames.map((itemFrame, index) => (
			<ItemFrame
				key={index}
				{...itemFrame}
				onItemSelect={onItemSelect}
			/>
		))}
	</div>
);

ItemFrameRenderer.propTypes = {
  itemFrames: PropTypes.arrayOf(
    PropTypes.shape({
      itemName: PropTypes.string,
      selected: PropTypes.bool
    })
  ).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default ItemFrameRenderer;