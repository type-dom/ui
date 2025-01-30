import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdImage extends ITypeDiv {
  className: 'TdImage';
}

export interface ImageProps extends TypeDivProps {
  /**
   * @description when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
   */
  hideOnClickModal?: boolean;
  /**
   * @description image source, same as native.
   *     default: '',
   */
  src?: string;
  /**
   * @description indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
   *     default: '',
   */
  fit?: '' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * @description Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
   */
  loading?: 'eager' | 'lazy';
  /**
   * @description whether to use lazy load.
   */
  lazy?: boolean;
  /**
   * @description the container to add scroll listener when using lazy load.
   */
  scrollContainer?: HTMLElement;
  //   type: definePropType<string | HTMLElement | undefined>([String, Object]),
  // },
  /**
   * @description allow big image preview.
   */
  previewSrcList?: string[];
  //   type: definePropType<string[]>(Array),
  //   default: () => mutable([] as const),
  // },
  /**
   * @description whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  previewTeleported?: boolean;
  /**
   * @description set image preview z-index.
   */
  zIndex?: number;
  /**
   * @description initial preview image index, less than the length of `url-list`.
   *     default: 0,
   */
  initialIndex?: number;
  /**
   * @description whether the viewer preview is infinite.
   *     default: true,
   */
  infinite?: boolean;
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   *     default: true,
   */
  closeOnPressEscape?: boolean;
  /**
   * @description the zoom rate of the image viewer zoom event
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
