import _ from 'lodash';
import {Platform, Dimensions} from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isIphoneX = () => {
  const {height, width} = Dimensions.get('window');
  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    return (
      (width === 375 && height === 812) || // Iphone X
      (width === 414 && height === 896) // IPhone XS
    );
  }
  return false;
};

export const Capitalize = (text: string): string => {
  return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
};

export const extractNumber = (text?: string): number => {
  const matches = text && text.match(/\d+$/);
  if (matches) {
    return parseInt(matches[0], 10);
  } else {
    return -1;
  }
};

export const hexToRgb = (
  hex: string,
): {r: number; g: number; b: number} | null => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const deleteKeyForFalsyValues = (data: any) => {
  return _.pickBy(data, _.identity);
};

export const pushItemInArray = (item?: any, array: any[] = []) => {
  return _.concat(array, item);
};

export const generateRankThreadObj = (
  widgetType: string,
  rank?: string | number,
  ...props: any
) => {
  return rank
    ? {
        ...props,
        widgetType,
        rank,
      }
    : undefined;
};

export const formatToCurrency = (
  value: number,
  optionsOverride?: Intl.NumberFormatOptions,
) => {
  if (value >= 0) {
    return Number(value).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      ...optionsOverride,
    });
  }
  return '';
};
