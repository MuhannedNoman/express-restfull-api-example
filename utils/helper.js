import { v4 as uuidv4 } from 'uuid'; 

export const stringify = (obj) => {
  return obj ? JSON.stringify(obj, null, 2) : 'Null';
};

export const generateKey = () => {
  return uuidv4();
}