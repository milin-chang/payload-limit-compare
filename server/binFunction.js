function binPackingFFD(items, binCapacity) {
  const sortedItems = [...items].sort((a, b) => b - a);
  const bins = [];

  for (const item of sortedItems) {
    let placed = false;

    for (const bin of bins) {
      if (bin.remaining >= item) {
        bin.items.push(item);
        bin.remaining -= item;
        placed = true;
        break;
      }
    }

    if (!placed) {
      bins.push({
        items: [item],
        remaining: binCapacity - item
      });
    }
  }

  return bins;
}


module.exports = {binPackingFFD};