import { TypeProps, ITypeDiv } from '@type-dom/framework';
import { Placement } from '@type-dom/popper';

export interface ITdSliderButton extends ITypeDiv {
  className: 'TdSliderButton';
}

export interface ITdSliderButtonConfig extends TypeProps {
  modelValue?: number;
  vertical?: boolean;
  tooltipClass?: string;
  placement?: Placement;
}

export interface SliderButtonInitData {
  hovering: boolean;
  dragging: boolean;
  isClick: boolean;
  startX: number;
  currentX: number;
  startY: number;
  currentY: number;
  startPosition: number;
  newPosition: number;
  oldValue: number;
}
