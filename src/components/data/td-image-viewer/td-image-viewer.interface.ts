import {
  ISlotRaw,
  ITypeFragment,
  TypeFragmentProps,
  TypeSvgSvg
} from '@type-dom/framework';

export interface ITdImageViewer extends ITypeFragment {
  className: 'TdImageViewer';
}

export interface ImageViewerProps extends TypeFragmentProps {
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
   * @description show preview image progress content.
   *    default: false,
   */
  showProgress?: boolean;
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: 'anonymous' | 'use-credentials' | '';

  slots?: {
    progress?: (progress: any, index?: number) => ISlotRaw | ISlotRaw[];
    toolbar?: (toolbar: any) => ISlotRaw | ISlotRaw[];
  }
}

export type ImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise';

export interface ImageViewerMode {
  name: string;
  icon: TypeSvgSvg; // typeof SvgSvg 是不行的；
}
