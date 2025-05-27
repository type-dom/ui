import {
  ITypeDiv,
  TypeDivProps,
  TypeSvgSvg,
} from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { MaybeRef, Ref } from '@type-dom/signals';

export interface ITdRate extends ITypeDiv {
  className: 'TdRate';
}

export interface RateProps extends TypeDivProps {
  /**
   * @description binding value
   *     default: 0,
   */
  modelValue?: number;
  vModel?: Ref<number>;
  /**
   * @description native `id` attribute
   */
  id?: string;
  /**
   * @description threshold value between low and medium level. The value itself will be included in low level
   *     default: 2,
   */
  lowThreshold?: number;
  /**
   * @description threshold value between medium and high level. The value itself will be included in high level
   *     default: 4,
   */
  highThreshold?: number;
  /**
   * @description max rating score
   *     default: 5,
   */
  max?: number;
  /**
   * @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
   default: () => mutable(['', '', ''] as const),
   */
  colors?: MaybeRef<string[] | Record<number, string>>;
  /**
   * @description color of unselected icons
   *     default: '',
   */
  voidColor?: string;
  /**
   * @description color of unselected read-only icons
   *     default: '',
   */
  disabledVoidColor?: string;
  /**
   * @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
   default: () =>
   [StarFilled, StarFilled, StarFilled] as [Component, Component, Component],
   */
  icons?:
    | Array<string | typeof TypeSvgSvg>
    | Record<number, string | typeof TypeSvgSvg>;
  /**
   * @description component of unselected icons
   *     default: () => Star as Component,
   */
  voidIcon?: typeof TypeSvgSvg;
  /**
   * @description component of unselected read-only icons
   *     default: () => StarFilled as Component,
   */
  disabledVoidIcon?: typeof TypeSvgSvg;
  /**
   * @description whether Rate is read-only
   */
  disabled?: boolean;
  /**
   * @description whether picking half start is allowed
   */
  allowHalf?: boolean;
  /**
   * @description whether to display texts
   */
  showText?: boolean;
  /**
   * @description whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore?: boolean;
  /**
   * @description color of texts
   *     default: '',
   */
  textColor?: string;
  /**
   * @description text array
   */
  texts?: string[];
  //   default: () =>
  //     mutable([
  //       'Extremely bad',
  //       'Disappointed',
  //       'Fair',
  //       'Satisfied',
  //       'Surprise',
  //     ] as const),
  /**
   * @description score template
   *     default: '{value}',
   */
  scoreTemplate?: string;
  /**
   * @description size of Rate
   */
  size?: ComponentSize;
  /**
   * @description whether value can be reset to `0`
   */
  clearable?: boolean;
  // ...useAriaProps(['ariaLabel']),
}
