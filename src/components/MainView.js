import React from 'react';
import PropTypes from 'prop-types';
import {mainViewImages} from '../utils/AssetsLoader';
import {mainScreenWidth, mainScreenHeight, screenBorderRadius} from '../constants/constants';

class MainView extends React.Component {
  executeMotion(motion) {
    // use setTimeout to set duration individually
    const change = motionIndex => {
      if (motionIndex < motion.length) {
      	this.mainView.src = mainViewImages[motion[motionIndex].mainViewImage].src;
    		setTimeout(change.bind(undefined, motionIndex + 1), motion[motionIndex].duration);
      } else {
      	this.props.onMotionEnd();
      }
    }
    change(0);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.motion !== null) {
      this.executeMotion(nextProps.motion);
      return false;
    }
    return nextProps.mainViewImage !== this.props.mainViewImage;
  }

  render() {
    return (
      <img
        ref={mainView => this.mainView = mainView}
        width={mainScreenWidth}
        height={mainScreenHeight}
    		src={mainViewImages[this.props.mainViewImage].src}
    		style={{
    			borderRadius: screenBorderRadius
    		}}
    		alt=""
    	/>
    );
  }
}

MainView.propTypes = {
	mainViewImage: PropTypes.string.isRequired,
  motion: PropTypes.array // nullable
};

export default MainView;
