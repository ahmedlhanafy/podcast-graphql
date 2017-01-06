const formatColor = (values: Array<any>) => {
  if (values) {
    const enhancedColorsStr = values.map(num => parseInt(num, 10)).join(',');
    return `rgb(${enhancedColorsStr})`;
  }
  return 'white';
};

export default formatColor;
