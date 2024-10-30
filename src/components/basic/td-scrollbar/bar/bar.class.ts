import { UI } from '../../../../ui/ui.abstract';
import { TdScrollbarThumb } from '../thumb/thumb.class';
import { ITdScrollbarBar, ITdScrollbarBarConfig } from './bar.interface';

export class TdScrollbarBar extends UI implements ITdScrollbarBar {
  className: 'TdScrollbarBar';
  override props: ITdScrollbarBarConfig;
  thumbs: [TdScrollbarThumb, TdScrollbarThumb];

  constructor(params: ITdScrollbarBarConfig = {}) {
    super();
    this.className = 'TdScrollbarBar';
    this.attr.addName('td-scrollbar-bar');
    this.style.addObj({
      position: 'absolute',
      right: '2px',
      bottom: '2px',
      zIndex: 1,
      borderRadius: '4px'
    });
    // config?.minSize 20
    this.thumbs = [
      new TdScrollbarThumb({
        vertical: false,
        ratio: 1
      }),
      new TdScrollbarThumb({
        vertical: true,
        ratio: 1
      })
    ];
    this.props = this.useParams(params);
  }
}
