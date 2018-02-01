import React from 'react';
import PropTypes from 'prop-types';
import {itemDetailImages} from '../utils/AssetsLoader';
import {itemDetailWindowWidth, itemDetailWindowHeight, itemDetailWindowBorderWidth} from '../constants/constants';

const ItemDetailView = ({itemDetailImage}) => (
  <img
    width={itemDetailWindowWidth - itemDetailWindowBorderWidth * 2}
    height={itemDetailWindowHeight - itemDetailWindowBorderWidth * 2}
    src={itemDetailImages[itemDetailImage].src}
    alt=""
  />
);

ItemDetailView.propType = {
  itemDetailImage: PropTypes.string.isRequired
};

export default ItemDetailView;
