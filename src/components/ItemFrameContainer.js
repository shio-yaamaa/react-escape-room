import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectItem} from '../redux/modules/selectedItem';
import ItemFrame from './ItemFrame';

const ItemFrameContainer = ({itemFrames, onItemSelect}) => (
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

ItemFrameContainer.propTypes = {
  itemFrames: PropTypes.arrayOf(
    PropTypes.shape({
      itemName: PropTypes.string,
      selected: PropTypes.bool
    })
  ).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	const itemFrames = Array(2 * 7).fill({
		itemName: null,
		selected: false
	});

	Object.keys(state.items).forEach(itemName => {
		const item = state.items[itemName];
		if (item.obtainStatus === 'OBTAINED') {
			itemFrames[item.frameIndex] = {
				itemName: itemName,
				selected: state.selectedItem === itemName
			};
		}
	});

	return {itemFrames};
}

const mapDispatchToProps = dispatch => {
	return {
		onItemSelect: (itemName) => {
			dispatch(selectItem(itemName));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemFrameContainer);