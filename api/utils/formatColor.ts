const formatColor = (values: Array<any>): string => {
  if (values) {
    const enhancedColors: string = values
      .map(num => parseInt(num, 10)).join(',');
    return `rgb(${enhancedColors})`;
  }
  return 'white';
};

export default formatColor;
