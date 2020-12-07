// import original module declarations
import 'styled-components';

export enum FontFamily {
  TEXT = 'text',
  BOLD = 'bold',
  BLACK = 'black',
  REGULAR = 'regular',
  REGULAR_ITALIC = 'regularItalic',
  MEDIUM = 'medium',
  MEDIUM_ITALIC = 'mediumItalic',
  LIGHT = 'light',
  LIGHT_ITALIC = 'lightItalic',
  THIN = 'thin',
  THIN_ITALIC = 'thinItalic',
  CODE = 'code',
}
export enum FontWeight {
  LIGHT = 'light',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  BOLD = 'bold',
}
export enum FontSize {
  TINY = 'tiny',
  XSMALL = 'xsmall',
  NORMAL = 'normal',
  SMALL = 'small',
  DEFAULT = 'default',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
}
export interface AppFonts {
  family: {[key in FontFamily]: string};
  weight: {[key in FontWeight]: number};
  size: {[key in FontSize]: number};
}

export enum TextColors {
  DEFAULT = 'default',
  INPUTS = 'inputs',
  SECONDARY = 'secondary',
  SUBTLE = 'subtle',
  ERROR = 'error',
  DISABLED = 'disabled',
}
export enum ButtonTypes {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LINK = 'link',
  DESTRUCTIVE = 'destructive',
}
export enum ButtonColors {
  BACKGROUND = 'background',
  BACKGROUND_HOVER = 'backgroundHover',
  BACKGROUND_FOCUS = 'backgroundFocus',
  BACKGROUND_ACTIVE = 'backgroundActive',
  TEXT = 'text',
  ICON = 'icon',
  BORDER = 'border',
  BORDER_HOVER = 'borderHover',
  BORDER_FOCUS = 'borderFocus',
  BORDER_ACTIVE = 'borderActive',
  SHADOW = 'shadow',
}
export interface AppColors {
  base: {[key: string]: string};
  text: {[key in TextColors]: string};
  button: {
    [key in ButtonTypes]: {
      [key in ButtonColors]?: string;
    };
  };
}

export enum SpacingTypes {
  XXSMALL = 'xxsmall',
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = 'xxlarge',
}
export type AppSpacing = {[key in SpacingTypes]: number};

export interface AppTokens {
  fonts: AppFonts;
  colors: AppColors;
  spacing: AppSpacing;
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizeTiny: number;
    fontSizeSmall: number;
    fontSizeDefault: number;
    fontSizeMedium: number;
    fontSizeLarge: number;
    fontSizeXL: number;
    backgroundColor: string;
    backgroundColorDarker: string;
    screenMargin: number;
    tabBarHeight: number;
    navBarHeight: number;
    defaultColor: string;
    primaryColor: string;
    secondaryColor: string;
    errorColor: string;
    grayColor: string;
    fitcashBrandColor: string;
    defaultPadding: number;
    loaderBackgroundColor: string;
    loaderForegroundColor: string;
    loaderSize: 'small' | 'large';
    tokens: AppTokens;
  }
}
