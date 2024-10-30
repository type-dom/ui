import { IUI, IUIConfig } from '../../../../ui/ui.interface';
import { TypeElement } from '@type-dom/framework';

export interface ITdAnchorLink extends IUI {
  className: 'TdAnchorLink';
}

export interface ITdAnchorLinkConfig extends IUIConfig {
  /**
   * @description the text content of the anchor link
   */
  title?: string;
  /**
   * @description The address of the anchor link
   */
  href?: string;

  contents?: TypeElement[];
}
