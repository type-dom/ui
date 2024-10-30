import { Div } from '@type-dom/framework';
import { UI } from '../../../../ui/ui.abstract';
import { $bgColor, $scrollbar } from '../../../../styles/var';
import { ITdScrollbarThumb, ITdScrollbarThumbConfig } from './thumb.interface';

export class TdScrollbarThumb extends UI implements ITdScrollbarThumb {
  className: 'TdScrollbarThumb';
  override props: ITdScrollbarThumbConfig
  private thumb: Div;

  constructor(params: ITdScrollbarThumbConfig = {}) {
    super();
    this.className = 'TdScrollbarThumb';
    this.attr.addName('td-scrollbar-thumb');
    this.style.addObj({
      position: 'absolute',
      right: '2px',
      bottom: '2px',
      zIndex: 1,
      borderRadius: '4px'
    });
    this.thumb = new Div({
      styleObj: {
        position: 'relative',
        display: 'block',
        width: 0,
        height: 0,
        cursor: 'pointer',
        borderRadius: 'inherit',
        // background-color: var(
        //   #{getCssVarName('scrollbar-bg-color')},
        //   map.get($scrollbar, 'bg-color')
        // ),
        backgroundColor: $scrollbar.bgColor,
        // transition: getCssVar('transition-duration') background-color,
        // transition: $transitionDuration + ' ' + $bgColor.default,
        // opacity: var(
        //   #{getCssVarName('scrollbar-opacity')},
        //   map.get($scrollbar, 'opacity')
        // ),
        opacity: $scrollbar.opacity
      }
    });
    this.addChild(this.thumb);
    this.props = this.useParams(params);
  }
}
