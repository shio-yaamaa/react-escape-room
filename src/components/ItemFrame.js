import React from 'react';
import PropTypes from 'prop-types';
import {itemFrameSize, itemFrameMargin, itemFrameBorderWidth, magnifyingGlassSize} from '../constants/constants';
import {itemBackgroundColor, itemFrameHoveredBorderColor, itemInHandFrameBorderColor} from '../constants/colors';
import {itemImages, magnifyingGlassImage} from '../utils/AssetsLoader';

class ItemFrame extends React.Component {
  componentDidMount() {
    this.itemFrame.addEventListener('mouseenter', () => {
      this.itemFrame.style.borderColor = this.props.inHand
        ? itemInHandFrameBorderColor
        : (this.props.itemName === null ? 'trasparent' : itemFrameHoveredBorderColor);
      this.magnifyingGlass.style.visibility = 'visible';
    });
    this.itemFrame.addEventListener('mouseleave', () => {
      this.itemFrame.style.borderColor = this.props.inHand
        ? itemInHandFrameBorderColor
        : 'transparent';
      this.magnifyingGlass.style.visibility = 'hidden';
    });
  }

  render() {
    return (
      <div
        ref={itemFrame => this.itemFrame = itemFrame}
    		style={{
          position: 'relative',
    			width: itemFrameSize,
    			height: itemFrameSize,
    			margin: itemFrameMargin,
    			borderRadius: 5,
          backgroundColor: itemBackgroundColor,
          border: `${itemFrameBorderWidth}px solid ${this.props.inHand ? 'white' : 'transparent'}`
    		}}
    		onClick={() => {
    			if (this.props.itemName !== null) {
    				this.props.onChangeItemInHand(this.props.inHand ? null : this.props.itemName);
    			}
    		}}
    	>
    		{this.props.itemName !== null && <img
    			src={itemImages[this.props.itemImage].src}
    			width={itemFrameSize - itemFrameBorderWidth * 2}
    			style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
    			alt=""
    		/>}
        <img
          ref={magnifyingGlass => this.magnifyingGlass = magnifyingGlass}
          className={'magnifying-glass'}
          width={magnifyingGlassSize}
          height={magnifyingGlassSize}
          src={magnifyingGlassImage.src}
          style={{
            display: this.props.itemName === null ? 'none' : 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            visibility: 'hidden'
          }}
          onClick={event => {
            this.props.onChangeItemInDetailWindow(this.props.itemName);
            event.stopPropagation();
          }}
          alt=""
        />
      </div>
    );
  }
}

ItemFrame.propTypes = {
	inHand: PropTypes.bool.isRequired,
	itemName: PropTypes.string, // nullable
  itemImage: PropTypes.string, // nullable
	onChangeItemInHand: PropTypes.func.isRequired,
  onChangeItemInDetailWindow: PropTypes.func.isRequired
};

export default ItemFrame;
