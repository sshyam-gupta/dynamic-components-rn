import {isIOS} from '../../lib/common';
import themeTokens from './tokens';

export default {
  fontSizeTiny: themeTokens.fonts.size.tiny,
  fontSizeSmall: themeTokens.fonts.size.small,
  fontSizeDefault: themeTokens.fonts.size.default,
  fontSizeMedium: themeTokens.fonts.size.medium,
  fontSizeLarge: themeTokens.fonts.size.large,
  fontSizeXL: themeTokens.fonts.size.xlarge,

  backgroundColor: themeTokens.colors.base.white,
  backgroundColorDarker: themeTokens.colors.base.offWhite,
  screenMargin: 20,
  tabBarHeight: 49,
  navBarHeight: isIOS ? 44 : 56,

  defaultColor: themeTokens.colors.base.black,
  primaryColor: themeTokens.colors.base.primary,
  secondaryColor: themeTokens.colors.base.secondary,
  errorColor: themeTokens.colors.text.error,
  grayColor: themeTokens.colors.base.gray,
  fitcashBrandColor: '#cc8839',
  loaderBackgroundColor: 'rgba(0, 0, 0, 0.85)',
  loaderForegroundColor: themeTokens.colors.base.secondary,
  loaderSize: 'large',

  defaultPadding: themeTokens.spacing.small,

  tokens: themeTokens,
};
