import { IStyle } from '@type-dom/css-type';
import { TypeDivProps } from '@type-dom/framework';

export interface SliderMarkerProps extends TypeDivProps {
  mark?: string | {
      style: IStyle;
      label: any;
    }
}
