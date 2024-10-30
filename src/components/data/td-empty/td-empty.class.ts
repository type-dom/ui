import { addUnit } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { UI } from '../../../ui/ui.abstract';
import { ITdEmpty, ITdEmptyConfig } from './td-empty.interface';
import { Div, Img, P } from '@type-dom/framework';
import {
  $emptyBottomStyle,
  $emptyDescriptionPStyle,
  $emptyDescriptionStyle, $emptyImageImgStyle,
  $emptyImageStyle, $emptyImageSvgStyle,
  $emptyStyle
} from './td-empty.style';
import { ImgEmpty } from './img-empty.class';

export class TdEmpty extends UI implements ITdEmpty {
  className: 'TdEmpty';
  override props: ITdEmptyConfig;
  private image: Div;
  private description: Div;
  private bottom?: Div;
  constructor(params: ITdEmptyConfig = {}) {
    super();
    this.className = 'TdEmpty';
    this.attr.addName('td-empty');
    this.style.addObj($emptyStyle);
    this.image = new Div({
      name: 'image',
      styleObj: $emptyImageStyle
    });
    if (params?.imageSize) {
      this.image.style.addObj(this.imageStyle);
    }
    this.addChild(this.image);
    if (params?.image) {
      this.image.addChild(new Img({
        styleObj: $emptyImageImgStyle,
        attrObj: {
          src: params.image,
        },
        events: {
          dragstart: () => {
            return false;
          }
        }
      }));
    } else {
      const imageSlot = this.getSlotNode('image');
      this.image.addChild(imageSlot);
      if (!params?.slots?.image) {
        imageSlot.addSlot(new ImgEmpty({
          styleObj: $emptyImageSvgStyle,
        }));
      }
    }
    this.description = new Div({
      name: 'description',
      styleObj: $emptyDescriptionStyle
    });
    this.addChild(this.description);
    if (params?.slots?.description) {
      this.description.slotChild(params.slots.description);
    } else {
      this.description.addChild(new P({
        text: this.emptyDescription,
        styleObj: $emptyDescriptionPStyle,
      }));
    }
    if (params?.slot) {
      this.bottom = new Div({
        name: 'bottom',
        styleObj: $emptyBottomStyle,
      });
      this.addChild(this.bottom);
      this.bottom.slotChild(params.slot);
    }
    this.props = this.useParams(params);
  }

  get emptyDescription() {
    return this.props.description || 'No Data'; // || t('el.table.emptyText')
  }
  get imageStyle(): IStyle {
    return { width: addUnit(this.props.imageSize) };
  }
}
