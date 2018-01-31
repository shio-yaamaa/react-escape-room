// Initial state

const initialSelectedItem = {
  itemInHand: null,
  itemInDetailWindow: null
};

// Action creator

export const changeItemInHand = itemName => {
  return {
    type: 'CHANGE_ITEM_IN_HAND',
    itemName: itemName
  };
};

export const changeItemInDetailWindow = itemName => {
  return {
    type: 'CHANGE_ITEM_IN_DETAIL_WINDOW',
    itemName: itemName
  };
};

// Reducer

export const selectedItem = (state = initialSelectedItem, action) => {
	switch (action.type) {
    case 'CHANGE_ITEM_IN_HAND':
      return {
        itemInHand: action.itemName,
        itemInDetailWindow: state.itemInDetailWindow
      };
    case 'CHANGE_ITEM_IN_DETAIL_WINDOW':
      return {
        itemInHand: state.itemInHand,
        itemInDetailWindow: action.itemName
      };
		case 'LOAD':
			return action.state.selectedItem;
		default:
			return state;
	}
}
