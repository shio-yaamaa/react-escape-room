import React from 'react';
import PropTypes from 'prop-types';
import ItemDetailView from './ItemDetailView';
import ItemDetailViewMap from './ItemDetailViewMap';
import {itemDetailWindowWidth, itemDetailWindowHeight} from '../constants/constants';

const ItemDetailWindow = ({itemDetailImage, itemDetailMapImage, onItemDetailViewClick, onItemDetailWindowCancel}) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }} onClick={onItemDetailWindowCancel}>
    <div style={{
      position: 'relative',
      width: itemDetailWindowWidth,
      height: itemDetailWindowHeight,
      borderRadius: 13,
      border: '3px solid #999999',
      backgroundColor: '#333333'
    }} onClick={event => event.stopPropagation()}>
      <ItemDetailView itemDetailImage={itemDetailImage} />
      <ItemDetailViewMap
        itemDetailMapImage={itemDetailMapImage}
        onItemDetailViewClick={onItemDetailViewClick}
      />
    </div>
  </div>
);

ItemDetailView.propType = {
  itemDetailImage: PropTypes.string.isRequired,
  itemDetailMapImage: PropTypes.string.isRequired,
  onItemDetailViewClick: PropTypes.func.isRequired,
  onItemDetailWindowCancel: PropTypes.func.isRequired
};

export default ItemDetailWindow;
