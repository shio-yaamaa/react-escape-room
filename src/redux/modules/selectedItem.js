// Action creator

export const selectItem = itemName => {
  return {
    type: 'SELECT_ITEM',
    itemName: itemName
  };
};

// Reducer

export const selectedItem = (state = null, action) => {
	switch (action.type) {
		case 'SELECT_ITEM':
			return action.itemName;
		default:
			return state;
	}
}