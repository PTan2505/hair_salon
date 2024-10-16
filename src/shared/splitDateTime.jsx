export const splitDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export const splitTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString();
};
