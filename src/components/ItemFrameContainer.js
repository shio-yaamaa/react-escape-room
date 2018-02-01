import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeItemInHand, changeItemInDetailWindow} from '../redux/modules/selectedItem';
import ItemFrame from './ItemFrame';
import stateToItemImageIndex from '../scenario/stateToItemImageIndex';
import {itemFrameMargin} from '../constants/constants';

const ItemFrameContainer = ({itemFrames, onChangeItemInHand, onChangeItemInDetailWindow}) => (
	<div style={{
		display: 'flex',
		flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
		width: '100%',
		height: '90%',
    marginTop: itemFrameMargin * -1
	}}>
		{itemFrames.map((itemFrame, index) => (
			<ItemFrame
				key={index}
				{...itemFrame}
				onChangeItemInHand={onChangeItemInHand}
        onChangeItemInDetailWindow={onChangeItemInDetailWindow}
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
  onChangeItemInHand: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	const itemFrames = Array(2 * 5).fill({
    itemName: null,
		itemImage: null,
		inHand: false
	});

	Object.keys(state.items).forEach(itemName => {
		const item = state.items[itemName];
		if (item.obtainStatus === 'OBTAINED') {
			itemFrames[item.frameIndex] = {
        itemName: itemName,
				itemImage: [itemName, stateToItemImageIndex(itemName, state.itemStatus)].join('_'),
				inHand: state.selectedItem.itemInHand === itemName
			};
		}
	});

	return {itemFrames};
}

const mapDispatchToProps = dispatch => {
	return {
		onChangeItemInHand: itemName => dispatch(changeItemInHand(itemName)),
    onChangeItemInDetailWindow: itemName => dispatch(changeItemInDetailWindow(itemName))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemFrameContainer);
