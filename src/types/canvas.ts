export interface DividerProps {
  height?: number;
  width?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  margin?: {
    left?: number;
    right?: number;
  };
}

export interface GradientProps {
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: {x: number; y: number};
  angle?: number;

  height?: string | number;
  width?: string | number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  borderRadius?: number;
}

export interface LayoutProps {
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  background?: {
    color?: string;
    url?: string;
  };
  divider?: DividerProps;
  gradient?: GradientProps;
}

export interface CanvasBlock {
  type: string;
  layoutProps?: LayoutProps;
  [key: string]: any;
}

export interface CanvasData {
  title?: string;
  viewScheme: string;
  id: string;
  blocks: CanvasBlock[];
}
