export const generateUniqueId = function () {
  return new Date().valueOf() + Math.random().toFixed(16).substring(2);
};
