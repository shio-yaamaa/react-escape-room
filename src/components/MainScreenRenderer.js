import React from 'react';
import PropTypes from 'prop-types';
import MainView from './MainView';
import MainViewOverlay from './MainViewOverlay';
import MainViewMap from './MainViewMap';
import ArrowArea from './ArrowArea';

const MainScreenRenderer = ({state, mapIndex, mainViewImage, mainViewOverlays, mainViewMapImage, arrowDirections, onMainScreenClick}) => (
	<div style={{
		position: 'relative',
		width: 480,
		height: '100%'
	}}>
		<MainView mainViewImage={mainViewImage} />
		<MainViewOverlay mainViewOverlays={mainViewOverlays} />
		<MainViewMap
			mainViewMapImage={mainViewMapImage}
			onMainViewClick={(color) => onMainScreenClick(state, mapIndex, color)}
		/>
		{arrowDirections.map(direction => (
			<ArrowArea
				key={direction}
				direction={direction}
				onArrowClick={(direction) => onMainScreenClick(state, mapIndex, direction)}
			/>
		))}
	</div>
);

MainScreenRenderer.propTypes = {
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
	onMainScreenClick: PropTypes.func.isRequired
};

export default MainScreenRenderer;