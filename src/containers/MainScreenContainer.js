import {connect} from 'react-redux';
import arrowDirections from '../scenario/arrowDirections';
import stateToImageIndex from '../scenario/stateToImageIndex';
import stateToMapImageIndex from '../scenario/stateToMapImageIndex';
import clickLocationToAction from '../scenario/clickLocationToAction';
import MainScreenRenderer from '../components/MainScreenRenderer';

const calculateOverlays = state => {
	const mainViewOverlays = [];
	if (state.perspective === 'dial') {
		state.status.retainedStatus.dialNumber.forEach((number, index) => {
			mainViewOverlays.push({
				image: `dial${number}`,
				pos: [20 + 50 * index, 50],
				scale: 1
			});
		});
	}
	return mainViewOverlays;
};

const mapStateToProps = state => {
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
		arrowDirections: arrowDirections[state.perspective]
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMainScreenClick: (state, mapIndex, location) => {
			clickLocationToAction(
				dispatch,
				state.perspective,
				mapIndex,
				location,
				state.status,
				state.items,
				state.selectedItem
			);
		}
	}
};

const MainScreenContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainScreenRenderer);

export default MainScreenContainer;