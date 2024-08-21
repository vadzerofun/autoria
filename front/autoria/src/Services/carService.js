// authService.js

// getCurrency
export const getCurrency = (currencyNumber) => {
  switch(currencyNumber) {
    case 0:
      return '$';
    case 1:
      return '€';
    case 2:
      return 'грн';
    default:
      return '$';
  }
};