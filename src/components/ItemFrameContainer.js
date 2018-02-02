import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeItemInHand, changeItemInDetailWindow} from '../redux/modules/selectedItem';
import ItemFrame from './ItemFrame';
import stateToItemImageIndex from '../scenario/stateToItemImageIndex';

const ItemFrameContainer = ({itemFrames, onChangeItemInHand, onChangeItemInDetailWindow}) => (
  <table style={{borderCollapse: 'collapse'}}><tbody>
    {itemFrames.map((element, rowStartIndex) => {
      if (rowStartIndex % 2 === 1) {
        return null;
      }
      return (<tr key={rowStartIndex}>
        {itemFrames.slice(rowStartIndex, rowStartIndex + 2).map((itemFrame, indexInRow) => (
          <td style={{padding: 0}} key={rowStartIndex + indexInRow}>
            <ItemFrame
              {...itemFrame}
              onChangeItemInHand={onChangeItemInHand}
              onChangeItemInDetailWindow={onChangeItemInDetailWindow}
            />
          </td>
        ))}
      </tr>);
    })}
  </tbody></table>
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
