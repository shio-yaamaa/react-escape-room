import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import arrowDirections from '../scenario/arrowDirections';
import stateToImageIndex from '../scenario/stateToImageIndex';
import stateToMapImageIndex from '../scenario/stateToMapImageIndex';
import stateToItemDetailImageIndex from '../scenario/stateToItemDetailImageIndex';
import stateToItemDetailMapImageIndex from '../scenario/stateToItemDetailMapImageIndex';
import clickLocationToAction from '../scenario/clickLocationToAction';
import itemDetailClickLocationToAction from '../scenario/itemDetailClickLocationToAction';
import MainView from './MainView';
import MainViewOverlay from './MainViewOverlay';
import MainViewMap from './MainViewMap';
import ArrowArea from './ArrowArea';
import ItemDetailWindow from './ItemDetailWindow';
import {endMotion} from '../redux/modules/gameControl';
import {changeItemInDetailWindow} from '../redux/modules/selectedItem';
import {dialCenterPositions} from '../constants/constants';

const MainScreen = ({state, mapIndex, mainViewImage, mainViewOverlays, mainViewMapImage,
  motion, motionCallback, arrowDirections, itemDetailImage, itemDetailMapImage, itemDetailMapIndex,
  onGameEnd, onMainScreenClick, onMotionEnd, onItemDetailWindowClick, onItemDetailWindowCancel}) => (
	<div style={{
		position: 'relative',
		width: 480,
		height: '100%'
	}}>
		<MainView mainViewImage={mainViewImage} motion={motion} onMotionEnd={() => onMotionEnd(motionCallback)} />
		<MainViewOverlay mainViewOverlays={mainViewOverlays} />
		<MainViewMap
			mainViewMapImage={mainViewMapImage}
			onMainViewClick={(color) => onMainScreenClick(state, mapIndex, color, motion !== null, onGameEnd)}
		/>
		{arrowDirections.map(direction => (
			<ArrowArea
				key={direction}
				direction={direction}
				onArrowClick={(direction) => onMainScreenClick(state, mapIndex, direction, motion !== null, onGameEnd)}
			/>
		))}
    {itemDetailImage !== null &&
      <ItemDetailWindow
        itemDetailImage={itemDetailImage}
        itemDetailMapImage={itemDetailMapImage}
        onItemDetailViewClick={color => onItemDetailWindowClick(state, itemDetailMapIndex, color)}
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
  motion: PropTypes.array, // nullable
  motionCallback: PropTypes.func, // nullable
	arrowDirections: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemDetailImage: PropTypes.string, // nullable
  itemDetailMapImage: PropTypes.string, // nullable
  itemDetailMapIndex: PropTypes.string, // nullable
	onGameEnd: PropTypes.func.isRequired,
	onMainScreenClick: PropTypes.func.isRequired,
  onMotionEnd: PropTypes.func.isRequired,
  onItemDetailWindowClick: PropTypes.func.isRequired,
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
  const itemDetailMapIndex = state.selectedItem.itemInDetailWindow === null
    ? null
    : stateToItemDetailMapImageIndex(state.selectedItem.itemInDetailWindow, state.itemStatus);

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
    motion: state.gameControl.motion,
    motionCallback: state.gameControl.motionCallback,
		arrowDirections: arrowDirections[state.perspective],
    itemDetailImage: state.selectedItem.itemInDetailWindow === null ? null : [
      state.selectedItem.itemInDetailWindow,
      stateToItemDetailImageIndex(state.selectedItem.itemInDetailWindow, state.itemStatus)
    ].join('_'),
    itemDetailMapImage: state.selectedItem.itemInDetailWindow === null ? null : [
      state.selectedItem.itemInDetailWindow,
      itemDetailMapIndex
    ].join('_'),
    itemDetailMapIndex: itemDetailMapIndex,

		onGameEnd: ownProps.onGameEnd
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMainScreenClick: (state, mapIndex, location, isInMotion, onGameEnd) => {
			clickLocationToAction(
				dispatch,
				state.perspective,
				mapIndex,
				location,
				state.status,
				state.items,
				state.selectedItem.itemInHand,
        isInMotion,
				onGameEnd
			);
		},
    onMotionEnd: motionCallback => {
      dispatch(endMotion());
      motionCallback.call();
    },
    onItemDetailWindowClick: (state, mapIndex, location) => {
      itemDetailClickLocationToAction(
        dispatch,
        state.selectedItem.itemInDetailWindow,
        mapIndex,
        location,
        state.itemStatus,
        state.selectedItem.itemInHand
      );
    },
    onItemDetailWindowCancel: () => dispatch(changeItemInDetailWindow(null)),
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainScreen);
