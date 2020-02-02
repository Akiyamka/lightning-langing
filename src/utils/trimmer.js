module.exports = string => ({
  sliceBeforeLast: symbol => {
    const indexOfLast = string.lastIndexOf(symbol);
    return string.slice(0, indexOfLast);
  }
});