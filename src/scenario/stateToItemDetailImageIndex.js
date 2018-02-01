const stateToItemDetailImageIndex = (itemName, itemStatus) => {
  switch (itemName) {
    case 'tissue':
      return itemStatus.retainedStatus.isTissueBall ? '01' : '00';
    default:
      return '00';
  }
};

export default stateToItemDetailImageIndex;
