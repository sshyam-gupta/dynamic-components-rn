import ImageWidget from '../widgets/ImageWidget';
import CellWidget from '../widgets/CellWidget';
import TypographyWidget from '../widgets/TypographyWidget';
import CarouselWidget from '../widgets/CarouselWidget';
import HorizontalListWidget from '../widgets/HorizontalListWidget';
import GridWidget from '../widgets/GridWidget';
import VerticalListWidget from '../widgets/VerticalListWidget';
import ProductTile from '../widgets/ProductTile';
import withCanvasLayout from '../components/Canvas/layout-hoc';
import ButtonWidget from '../widgets/ButtonWidget';

interface WidgetMap {
  [type: string]: React.FC<any> | React.ComponentClass<any>;
}

const widgetMap = {
  // Basic widgets
  IMAGE: withCanvasLayout(ImageWidget),
  CELL: withCanvasLayout(CellWidget),
  TYPOGRAPHY: withCanvasLayout(TypographyWidget),
  LIST: withCanvasLayout(HorizontalListWidget),
  GRID: withCanvasLayout(GridWidget),
  VERTICAL_LIST: withCanvasLayout(VerticalListWidget),
  CAROUSEL: withCanvasLayout(CarouselWidget),
  BUTTON: withCanvasLayout(ButtonWidget),

  // Composite widgets
  PRODUCT_TILE: withCanvasLayout(ProductTile),
} as WidgetMap;

export const getWidgetByType = (
  type: string,
): React.FC | React.ComponentClass => {
  return widgetMap[type] || null;
};

export default widgetMap;
