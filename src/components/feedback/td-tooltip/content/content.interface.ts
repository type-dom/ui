import { IUI, IUIConfig } from '../../../../ui/ui.interface';
import { ITdPopperContentConfig } from '../../td-popper/content/content.interface';


export interface ITdTooltipContent extends IUI {
  className: 'TdTooltipContent'
}

export interface ITdTooltipContentConfig extends ITdPopperContentConfig {
  // ...useDelayedToggleProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo?: string | HTMLElement;
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content?: string, // default: '',
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent?: boolean, // default: false,
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent?: boolean,
  /**
   * @description same as `aria-label`
   */
  ariaLabel?: string,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type?: boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   */
  // visible?: boolean | null; // default: null,
  /**
   * @description animation name
   */
  transition?: string,
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported?: boolean, // default: true,
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: boolean,


}
