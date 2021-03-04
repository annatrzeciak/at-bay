function convertToTwoDecimalPlaces(number: number): string {
  return (Math.round(number * 100) / 100).toFixed(2);
}

export default convertToTwoDecimalPlaces;
