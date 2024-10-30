import { Div } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdScrollbarBar } from './bar/bar.class';
import { ITdScrollbar, ITdScrollbarConfig } from './td-scrollbar.interface';

export class TdScrollbar extends UI implements ITdScrollbar {
  className: 'TdScrollbar';
  override props: ITdScrollbarConfig;
  private wrap: Div;
  private view: Div;

  constructor(params: ITdScrollbarConfig = {}) {
    super();
    this.useTag(params?.tag);
    this.className = 'TdScrollbar';
    this.attr.addName('td-scrollbar');
    this.style.addObj({
      overflow: 'hidden',
      position: 'relative',
      height: '100%'
    });
    this.wrap = new Div({
      name: 'td-scrollbar-wrap',
      styleObj: {
        overflow: 'auto',
        height: params?.height || '100%'
      }
    });
    this.view = new Div({
      // params?.tag 默认是div，简化处理，不加其它的tag标签了；
      name: 'td-scrollbar-view'
    });
    if (params?.viewStyle) {
      this.view.style.addObj(params.viewStyle);
    }
    this.wrap.addChild(this.view);
    if (params?.wrapStyle) {
      this.wrap.style.addObj(params.wrapStyle);
    }
    this.addChild(this.wrap);
    if (!params?.native) {
      const bar = new TdScrollbarBar({
        always: params?.always || true,
        minSize: params?.minSize || 20
      });
      this.addChildren(...bar.thumbs);
    }
    if (params?.contents) {
      this.view.addChildren(...params.contents);
    }
    this.props = this.useParams(params);
  }
}
