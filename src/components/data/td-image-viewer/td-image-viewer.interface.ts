import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TdIcon } from '../../basic/td-icon/td-icon.class';

export interface ITdImageViewer extends IUI {
  className: 'TdImageViewer';
}

export interface ITdImageViewerConfig extends IUIConfig {
  /**
   * @description preview link list.
   *     default: () => mutable([] as const),
   */
  urlList?: string[];
  /**
   * @description preview backdrop z-index.
   */
  zIndex?: number;
  /**
   * @description the initial preview image index, less than or equal to the length of `url-list`.
   *     default: 0,
   */
  initialIndex?: number;
  /**
   * @description whether preview is infinite.
   *     default: true,
   */
  infinite?: boolean;
  /**
   * @description whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal?: boolean;
  /**
   * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported?: boolean;
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   *     default?: true,
   */
  closeOnPressEscape?: boolean;
  /**
   * @description the zoom rate of the image viewer zoom event.
   *     default: 1.2,
   */
  zoomRate?: number;
  /**
   * @description the min scale of the image viewer zoom event.
   *     default: 0.2,
   */
  minScale?: number;
  /**
   * @description the max scale of the image viewer zoom event.
   *     default: 7,
   */
  maxScale?: number;
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: 'anonymous' | 'use-credentials' | '';
}

export type TdImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise';

export interface TdImageViewerMode {
  name: string;
  icon: TdIcon;
}
