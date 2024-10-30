import { TypeElement } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdLoading extends IUI {
  className: 'TdLoading';
}

export interface ITdLoadingConfig extends IUIConfig {
  parent?: TypeElement;
  /**
   * @description background color of the mask
   */
  background?: string; // MaybeRef<string>
  svg?: string; // MaybeRef<string>
  svgViewBox?: string; // MaybeRef<string>
  /**
   * @description class name of the custom spinner
   */
  spinner?: boolean | string; // MaybeRef<boolean | string>
  /**
   * @description loading text that displays under the spinner
   */
  text?: string; // MaybeRef<string>
  /**
   * @description same as the `fullscreen` modifier of `v-loading`
   */
  fullscreen?: boolean
  /**
   * @description same as the `lock` modifier of `v-loading`
   */
  lock?: boolean
  /**
   * @description custom class name for Loading
   */
  // customClass: MaybeRef<string>
  visible?: boolean
  target?: HTMLElement
  beforeClose?: () => boolean
  closed?: () => void
}
