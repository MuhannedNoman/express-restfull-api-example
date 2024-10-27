export const stringify = (obj) => {
  return obj ? JSON.stringify(obj, null, 2) : 'Null';
};
