module.exports = function generateItems(byteSize) {
  // number 大約 8 bytes
  const count = Math.floor(byteSize / 8);
  return Array.from({ length: count }, () => 1);
};
