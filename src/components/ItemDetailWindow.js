import React from 'react';
import PropTypes from 'prop-types';
import ItemDetailView from './ItemDetailView';
import ItemDetailViewMap from './ItemDetailViewMap';
import {mainScreenWidth, mainScreenHeight, itemDetailWindowMargin} from '../constants/constants';

const ItemDetailWindow = ({itemDetailImage, onItemDetailWindowCancel}) => (
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
      width: mainScreenWidth - itemDetailWindowMargin,
      height: mainScreenHeight - itemDetailWindowMargin,
      borderRadius: 13,
      border: '3px solid #999999',
      backgroundColor: '#333333'
    }} onClick={event => event.stopPropagation()}>
      <ItemDetailView itemDetailImage={itemDetailImage} />
      <ItemDetailViewMap />
    </div>
  </div>
);

ItemDetailView.propType = {
  itemDetailImage: PropTypes.string.isRequired,
  onItemDetailWindowCancel: PropTypes.func.isRequired
};

export default ItemDetailWindow;
