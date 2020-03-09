import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const hp = (percentage: number) => {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

//Function that replace null and undefined values with '' (empty string) 
//params: an Object
//returns: same object with '' values instead of null or undefined
export const emptySanitizeObj = (obj: object) => {
  Object.keys(obj).forEach(key => {
    if(obj[key] === null || obj[key] === undefined) {
      obj[key] = ''
    }
  });
  return obj;
}
