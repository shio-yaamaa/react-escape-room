import React from 'react';
import PropTypes from 'prop-types';
import {itemDetailImages} from '../utils/AssetsLoader';
import {mainScreenWidth, itemDetailWindowMargin} from '../constants/constants';

const ItemDetailView = ({itemDetailImage}) => (
  <img
    width={mainScreenWidth - itemDetailWindowMargin}
    src={itemDetailImages[itemDetailImage].src}
    alt=""
  />
);

ItemDetailView.propType = {
  itemDetailImage: PropTypes.string.isRequired
};

export default ItemDetailView;
