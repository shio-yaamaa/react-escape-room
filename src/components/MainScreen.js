import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import arrowDirections from '../scenario/arrowDirections';
import stateToImageIndex from '../scenario/stateToImageIndex';
import stateToMapImageIndex from '../scenario/stateToMapImageIndex';
import stateToItemDetailImageIndex from '../scenario/stateToItemDetailImageIndex';
import clickLocationToAction from '../scenario/clickLocationToAction';
import MainView from './MainView';
import MainViewOverlay from './MainViewOverlay';
import MainViewMap from './MainViewMap';
import ArrowArea from './ArrowArea';
import ItemDetailWindow from './ItemDetailWindow';
import {changeItemInDetailWindow} from '../redux/modules/selectedItem';
import {dialCenterPositions} from '../constants/constants';

const MainScreen = ({state, mapIndex, mainViewImage, mainViewOverlays, mainViewMapImage,
  arrowDirections, itemDetailImage, onGameEnd, onMainScreenClick, onItemDetailWindowCancel}) => (
	<div style={{
		position: 'relative',
		width: 480,
		height: '100%'
	}}>
		<MainView mainViewImage={mainViewImage} />
		<MainViewOverlay mainViewOverlays={mainViewOverlays} />
		<MainViewMap
			mainViewMapImage={mainViewMapImage}
			onMainViewClick={(color) => onMainScreenClick(state, mapIndex, color, onGameEnd)}
		/>
		{arrowDirections.map(direction => (
			<ArrowArea
				key={direction}
				direction={direction}
				onArrowClick={(direction) => onMainScreenClick(state, mapIndex, direction, onGameEnd)}
			/>
		))}
    {itemDetailImage !== null &&
      <ItemDetailWindow
        itemDetailImage={itemDetailImage}
        onItemDetailWindowCancel={onItemDetailWindowCancel}
      />
    }
	</div>
);

MainScreen.propTypes = {
	state: PropTypes.object.isRequired,
	mapIndex: PropTypes.string.isRequired,
	mainViewImage: PropTypes.string.isRequired,
	mainViewOverlays: PropTypes.arrayOf(
		PropTypes.shape({
      image: PropTypes.string,
      pos: PropTypes.arrayOf(PropTypes.number),
      scale: PropTypes.number
    })
	).isRequired,
	mainViewMapImage: PropTypes.string.isRequired,
	arrowDirections: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemDetailImage: PropTypes.string, // nullable
	onGameEnd: PropTypes.func.isRequired,
	onMainScreenClick: PropTypes.func.isRequired,
  onItemDetailWindowCancel: PropTypes.func.isRequired
};

const calculateOverlays = state => {
	const mainViewOverlays = [];
	if (state.perspective === 'dial') {
		state.status.retainedStatus.dialNumber.forEach((number, index) => {
			mainViewOverlays.push({
				image: `dial${number}`,
				pos: dialCenterPositions[index],
				isCenterPos: true,
				scale: 0.8
			});
		});
	}
	return mainViewOverlays;
};

const mapStateToProps = (state, ownProps) => {
	const mapIndex = stateToMapImageIndex(state.perspective, state.status, state.items);

	return {
		// for calling onMainScreenClick
		state: state,
		mapIndex: mapIndex,

		mainViewImage: [
			state.perspective,
			stateToImageIndex(state.perspective, state.status, state.items)
		].join('_'),
		mainViewOverlays: calculateOverlays(state),
		mainViewMapImage: [state.perspective, mapIndex].join('_'),
		arrowDirections: arrowDirections[state.perspective],
    itemDetailImage: state.selectedItem.itemInDetailWindow === null ? null : [
      state.selectedItem.itemInDetailWindow,
      stateToItemDetailImageIndex(state.selectedItem.itemInDetailWindow, state.itemDetailStatus)
    ].join('_'),

		onGameEnd: ownProps.onGameEnd
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMainScreenClick: (state, mapIndex, location, onGameEnd) => {
			clickLocationToAction(
				dispatch,
				state.perspective,
				mapIndex,
				location,
				state.status,
				state.items,
				state.selectedItem,
				onGameEnd
			);
		},
    onItemDetailWindowCancel: () => dispatch(changeItemInDetailWindow(null)),
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainScreen);
