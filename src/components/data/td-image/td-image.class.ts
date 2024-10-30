import { Div, Img, SlotNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdImage, ITdImageConfig } from './td-image.interface';
import { $image, $size } from './td-image.style';

export class TdImage extends UI implements ITdImage {
  className: 'TdImage';
  override props: ITdImageConfig;
  private img?: Img;
  private hasLoadError: boolean;
  private errorSlot?: SlotNode;
  placeholderSlot?: SlotNode; // todo
  viewerSlot?: SlotNode;

  constructor(params: ITdImageConfig = {}) {
    super();
    this.className = 'TdImage';
    this.attr.addName('td-image');
    this.attr.addObj({
      ref: 'container'
    });
    this.style.addObj({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      textAlign: 'center',
      overflow: 'hidden',
      // color: getCssVar('image', 'text-color'),
      color: $image.textColor,
      // background: getCssVar('image', 'bg-color'),
      background: $image.bgColor,
      // width: getCssVar('image', 'size'),
      width: $size.width,
      // height: getCssVar('image', 'size'),
      height: $size.height,
      // font-size: getCssVar('image', 'text-size'),
      fontSize: $image.textSize
    });
    this.hasLoadError = false;
    // todo preview
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (this.hasLoadError) {
      this.errorSlot = new SlotNode('error');
      this.addChild(this.errorSlot);
      if (props?.slots?.error) {
        this.errorSlot.addSlot(props.slots.error);
      } else {
        this.errorSlot.addSlot(new Div({
          name: 'error', // t('el.image.error')
          text: 'error',
        }))
      }
    } else {
    //   todo
    }
    if (props?.src && !this.hasLoadError) {
      this.img = new Img({
        name: 'image',
        styleObj: {
          display: 'block',
          width: '100%',
          height: '100%'
        },
        attrObj: {
          src: props.src
        }
      });
      this.addChild(this.img);
    } else {
      if (props?.slot) {
        this.slotChild(props.slot);
      }
    }
    const fit = props?.fit || 'cover';
    this.img?.style.addObj({
      objectFit: fit
    });
    this.useParams(props);
  }

  // todo 监听 src 改变
  setSrc(src: string) {
    if (this.props.src) {
      this.props.src = src;
    }
    if (this.props.src !== src) {
      this.hasLoadError = false;
    }
  }

  handleError(e: Event) {
    this.hasLoadError = true;
    // emit('error', e)
  }
}
