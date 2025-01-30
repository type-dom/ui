import { addUnit, isNumber } from '@type-dom/utils';
import { Img, TypeFragment, TypeHtml, TypeSpan } from '@type-dom/framework';
import { ITdAvatar, ITdAvatarConfig } from './td-avatar.interface';
import { $avatar, $avatarSize, $avatarStyle } from './td-avatar.style';

export class TdAvatar extends TypeSpan implements ITdAvatar {
  className: 'TdAvatar';
  override props: ITdAvatarConfig;
  private img?: Img;
  private hasLoadError: boolean;

  constructor(params: ITdAvatarConfig = {}) {
    super();
    this.className = 'TdAvatar';
    this.attr.addName('td-avatar');
    this.style.addObj($avatarStyle);
    this.hasLoadError = false;
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if ((props?.src || props?.srcSet) && !this.hasLoadError) {
      this.img = new Img({
        name: 'image',
        styleObj: {
          display: 'block',
          width: '100%',
          height: '100%',
        },
        attrObj: {
          src: props.src,
        },
      });
      this.addChild(this.img);
    } else if (props?.icon) {
      this.addChild(props.icon);
      this.style.addObj({
        fontSize: $avatar.iconSize,
      });
    } else {
      if (props?.slot) {
        this.slotChildren(props.slot);
      }
    }
    const fit = props?.fit || 'cover';
    this.img?.style.addObj({
      objectFit: fit,
    });
    const shape = props?.shape || 'circle';
    this.style.addObj({
      borderRadius: shape === 'circle' ? '50%' : $avatar.borderRadius,
    });
    const size = props?.size || 'default';
    if (isNumber(size)) {
      this.style.addObj({
        width: addUnit(size),
        height: addUnit(size),
      });
      this.img?.style.addObj({
        width: addUnit(size),
        height: addUnit(size),
      });
      if (props?.slot instanceof TypeHtml) {
        props.slot.style.addObj({
          width: addUnit(size),
          height: addUnit(size),
        });
      } else if (props?.slot instanceof TypeFragment) {
        props.slot.addStyleObj({
          width: addUnit(size),
          height: addUnit(size),
        });
      }
    } else {
      this.style.addObj({
        width: $avatarSize[size],
        height: $avatarSize[size],
      });
      this.img?.style.addObj({
        width: $avatarSize[size],
        height: $avatarSize[size],
      });
      if (props?.slot instanceof TypeHtml) {
        props.slot.style.addObj({
          width: $avatarSize[size],
          height: $avatarSize[size],
        });
      } else if (props?.slot instanceof TypeFragment) {
        props.slot?.addStyleObj({
          width: $avatarSize[size],
          height: $avatarSize[size],
        });
      }
    }
  }

  // todo 监听 src 改变
  setSrc(src: string) {
    if (this.props?.src) {
      this.props.src = src;
    }
    if (this.props?.src !== src) {
      this.hasLoadError = false;
    }
  }

  handleError(e: Event) {
    this.hasLoadError = true;
    // emit('error', e)
  }
}
