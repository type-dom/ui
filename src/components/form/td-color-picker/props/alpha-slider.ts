import { TypeDivProps } from '@type-dom/framework';
import type Color from '../utils/color'

export const alphaSliderProps: AlphaSliderProps = {
  vertical: false,
}

export interface AlphaSliderProps extends TypeDivProps {
  color?: Color, //required: true,
  vertical?: boolean,
}
