import { TypeElement } from '@type-dom/framework';
import { IUI } from '../../../ui/ui.interface';
import { IAriaConfig } from '../../../aria';
import { ISize } from '../../../styles/size';

export interface ITdSegmented extends IUI {
  className: 'TdSegmented';
}

export type Option =
  | {
  label: string
  value: string | number | boolean
  disabled?: boolean
  slot?: TypeElement;
  [key: string]: any
}
  | string
  | number
  | boolean
  | undefined

export interface ITdSegmentedConfig extends IAriaConfig {
  /**
   * @description options of segmented
   *     default: () => [],
   */
  options?: Option[];
  /**
   * @description binding value
   *     default: undefined,
   */
  modelValue?: string | number | boolean;
  /**
   * @description fit width of parent content
   */
  block?: boolean,
  /**
   * @description size of component
   */
  size?: ISize,
  /**
   * @description whether segmented is disabled
   */
  disabled?: boolean,
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean;
  /**
   * @description native input id
   */
  id?: string,
  /**
   * @description native `name` attribute
   */
  name?: string,
}
