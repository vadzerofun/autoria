// formatService.js

// images
const imagesURL = import.meta.env.VITE_IMAGES_URL;

// formatNumber
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(number)
    .replace(/,/g, ' ');
};

// capitalizeObjectKeys
export const capitalizeObjectKeys = (obj) => {
  const capitalizedObj = {};

  Object.keys(obj).forEach((key) => {
    // Capitalize the first letter of the key
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

    // !! Temporary !!
    if (key === 'id') {
      capitalizedObj[key] = obj[key];
    } else {
      // Assign the value to the new key in the new object
      capitalizedObj[capitalizedKey] = obj[key];
    }

    if (key === 'imagesPath') {
      capitalizedObj[capitalizedKey] = obj[key].map((file) => imagesURL + file);
    }
  });

  return capitalizedObj;
};
