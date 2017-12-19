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

// Reducers

export const items = (state = initialItems, action) => {
  switch (action.type) {
    case 'OBTAIN_ITEM':
      const frameIndex = Object.values(state)
        .map(item => item.frameIndex)
        .reduce((prev, curr) => (prev === curr ? curr + 1 : prev), 0);
      console.log(frameIndex);
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
    default:
      return state;
  }
};