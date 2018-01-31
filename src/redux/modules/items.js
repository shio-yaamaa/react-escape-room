// Initial state

const initialItemState = {
  obtainStatus: 'NOT_OBTAINED',
  frameIndex: -1
}

const initialItems = {
  board1:       Object.assign({}, initialItemState),
  board2:       Object.assign({}, initialItemState),
  keyToBox:     Object.assign({}, initialItemState),
  keyToDoor:    Object.assign({}, initialItemState),
  keyToDrawer:  Object.assign({}, initialItemState),
  keyToLocker1: Object.assign({}, initialItemState),
  keyToLocker3: Object.assign({}, initialItemState),
  screwdriver:  Object.assign({}, initialItemState),
  stick:        Object.assign({}, initialItemState),
  tissue:       Object.assign({}, initialItemState)
};

// Action creators

export const obtainItem = itemName => {
  return {
    type: 'OBTAIN_ITEM',
    itemName: itemName
  };
};

export const useItem = itemName => {
  return {
    type: 'USE_ITEM',
    itemName: itemName
  };
};

// useItemしなくてOK
export const convertItem = (sourceItemName, targetItemName) => {
  return {
    type: 'CONVERT_ITEM',
    sourceItemName: sourceItemName,
    targetItemName: targetItemName
  };
};

// useItemしなくてOK
export const combineItems = (itemNameInHand, itemNameInDetailWindow, targetItemName) => {
  return {
    type: 'COMBINE_ITEMS',
    itemNameInHand: itemNameInHand,
    itemNameInDetailWindow: itemNameInDetailWindow,
    targetItemName: targetItemName
  };
};

// Reducers

export const items = (state = initialItems, action) => {
  switch (action.type) {
    case 'OBTAIN_ITEM':
      //const frameIndex = Object.values(state) // Android default browser does not support Object#values
      const frameIndex = Object.keys(state).map(key => state[key])
        .map(item => item.frameIndex)
        .sort((frameIndex1, frameIndex2) => frameIndex1 - frameIndex2)
        .reduce((prev, curr) => (prev === curr ? curr + 1 : prev), 0);
      return Object.assign({}, state, {
        [action.itemName]: {
          obtainStatus: 'OBTAINED',
          frameIndex: frameIndex
        }
      });
    case 'USE_ITEM':
      return Object.assign({}, state, {
        [action.itemName]: {
          obtainStatus: 'USED',
          frameIndex: -1
        }
      });
    case 'CONVERT_ITEM':
      return Object.assign({}, state, {
        [action.sourceItemName]: {
          obtainStatus: 'USED',
          frameIndex: -1
        },
        [action.targetItemName]: {
          obtainStatus: 'OBTAINED',
          frameIndex: state[action.sourceItemName].frameIndex
        }
      });
    case 'COMBINE_ITEMS':
      return Object.assign({}, state, {
        [action.itemNameInHand]: {
          obtainStatus: 'USED',
          frameIndex: -1
        },
        [action.itemNameInDetailWindow]: {
          obtainStatus: 'USED',
          frameIndex: -1
        },
        [action.targetItemName]: {
          obtainStatus: 'OBTAINED',
          frameIndex: state[action.itemNameInDetailWindow].frameIndex
        }
      });
    case 'LOAD':
      return action.state.items;
    default:
      return state;
  }
};
