import {connect} from 'react-redux';
import {selectItem} from '../redux/modules/selectedItem';
import ItemFrameRenderer from '../components/ItemFrameRenderer';

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

const ItemFrameContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemFrameRenderer);

export default ItemFrameContainer;