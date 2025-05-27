import { Computed, Ref } from '@type-dom/signals';
import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants';
import { TooltipContentProps } from '../../feedback/td-tooltip/content/content.interface';

export interface ITdColorPicker extends ITypeFragment {
  className: 'TdColorPicker';
}

export interface ColorPickerProps extends TypeFragmentProps {
  /**
   * @description binding value
   */
  modelValue?: string,
  vModel?: Ref<string>,
  /**
   * @description ColorPicker id
   */
  id?: string,
  /**
   * @description whether to display the alpha slider
   */
  showAlpha?: boolean,
  /**
   * @description color format of v-model
   */
  colorFormat?: string,
  /**
   * @description whether to disable the ColorPicker
   */
  disabled?: boolean,
  /**
   * @description size of ColorPicker
   */
  size?: ComponentSize, // useSizeProp,
  /**
   * @description custom class name for ColorPicker's dropdown
   *     default: '',
   */
  popperClass?: string,
  /**
   * @description ColorPicker tabindex
   *     default: 0,
   */
  tabindex?: string | number,
  /**
   * @description whether color-picker popper is teleported to the body
   */
  teleported?: TooltipContentProps['teleported'],
  /**
   * @description predefined color options
   */
  predefine?: string[],
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean,
  // ...useAriaProps(['ariaLabel']),
}

export interface ColorPickerContext {
  currentColor: Computed<string>
}
