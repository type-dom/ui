import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { Placement } from '@type-dom/popper';
import { Ref } from '@type-dom/signals';
import { TdSliderButton } from './button.class';

export interface ITdSliderButton extends ITypeDiv {
  className: 'TdSliderButton';
}

export interface SliderButtonProps extends TypeDivProps {
  modelValue?: number;
  vertical?: boolean;
  tooltipClass?: string;
  placement?: Placement;
}

export type ButtonRefs = Record<
  'firstButton' | 'secondButton',
  Ref<TdSliderButton | undefined>
>

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
  oldValue: number | undefined;
}
