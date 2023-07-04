import { ITypeHtml } from '../type-html.interface';
/**
 * <h1-h6> 标题信息
 */
export interface ITypeHead extends ITypeHtml {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
}
