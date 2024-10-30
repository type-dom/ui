import { TypeElement } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';

export interface ITdDescriptions extends IUI {
  className: 'TdDescriptions';
}

export interface ITdDescriptionsConfig extends IUIConfig {
  /**
   * @description with or without border
   *     default: false,
   */
  border?: boolean;
  /**
   * @description numbers of `Descriptions Item` in one line
   *     default: 3,
   */
  column?: number;
  /**
   * @description direction of list
   *     default: 'horizontal',
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description size of list
   */
  size?: ISize;
  /**
   * @description title text, display on the top left
   *     default: '',
   */
  title?: string;
  /**
   * @description extra text, display on the top right
   *     default: '',
   */
  extra?: string;

  slots?: {
    title?: TypeElement;
    extra?: TypeElement;
  };

  slot: TdDescriptionsItem[];
}
