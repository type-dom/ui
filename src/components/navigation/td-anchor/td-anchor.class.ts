import { Div, I, TypeElement, TypeNode, TypeHtml } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdAnchor, ITdAnchorConfig } from './td-anchor.interface';
import { $anchor } from './td-anchor.style';
import { scrollTo } from './td-anchor.function';

export class TdAnchor extends UI implements ITdAnchor {
  className: 'TdAnchor';
  override props: ITdAnchorConfig;
  private marker?: Div;
  private list?: Div;

  constructor(params: ITdAnchorConfig = {}) {
    super();
    this.className = 'TdAnchor';
    this.style.addObj({
      position: 'relative',
      // background-color: getCssVar('anchor-bg-color')
      backgroundColor: $anchor.bgColor.default
    });

    if (params?.marker) {
      this.marker = new Div({
        styleObj: {
          position: 'absolute',
          // background-color: getCssVar('anchor-marker-bg-color'),
          backgroundColor: $anchor.markerBgColor,
          borderRadius: '4px',
          opacity: 0,
          zIndex: 0
        }
      });
      this.addChild(this.marker);
    }
    this.list = new Div({
      name: 'list'
    });
    this.addChild(this.list);
    if (params?.slot) {
      this.list.slotChild(params.slot);
    }
    const type = params?.type || 'default';
    const direction = params?.direction || 'vertical';
    if (direction === 'vertical') {
      this.marker?.style.addObj({
        width: '4px',
        height: '14px',
        top: '8px',
        left: '0',
        transition: 'top 0.25s ease-in-out, opacity 0.25s'
      });
      this.list.style.addObj({
        // paddingLeft: getCssVar('anchor-padding-indent'),
        paddingLeft: $anchor.paddingIndent
      });
      if (type === 'underline') {
        this.unshiftChild(
          new I({
            styleObj: {
              position: 'absolute',
              left: '0',
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(5, 5, 5, 0.06)',
              content: ''
            }
          })
        );
        this.marker?.style.addObj({
          width: '2px',
          borderRadius: 'unset'
        });
      }
    } else {
      this.marker?.style.addObj({
        height: '2px',
        width: '20px',
        bottom: '0',
        transition: 'left 0.25s ease-in-out, opacity 0.25s, width 0.25s'
      });
      this.list.style.addObj({
        display: 'flex',
        paddingBottom: '4px'
      });
      this.list.childNodes.forEach((item, index) => {
        if (item instanceof TypeHtml) {
          if (index === 0) {
            item.style.addObj({
              paddingLeft: '0'
            });
          } else {
            item.style.addObj({
              paddingLeft: '16px'
            });
          }
        }
      });
      if (type === 'underline') {
        this.unshiftChild(
          new I({
            styleObj: {
              position: 'absolute',
              bottom: '0',
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(5, 5, 5, 0.06)',
              content: ''
            }
          })
        );
        this.marker?.style.addObj({
          height: '2px',
          borderRadius: 'unset'
        });
      }
    }
    this.props = this.useParams(params);
  }

  handleClick(e: MouseEvent, href?: string) {
    // emit('click', e, href)
    scrollTo(href, this.props);
  }
}
