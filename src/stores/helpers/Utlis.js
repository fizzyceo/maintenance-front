export const filterNonFalseValues = (filters) => {
  console.log(!filters);
  if (!filters) filters = {};

  return Object.keys(filters).reduce((acc, key) => {
    const value = filters[key];
    if (value !== null && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const capitalizeFirstCharacter = (text) => {
  if (!text.length) return;
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};
