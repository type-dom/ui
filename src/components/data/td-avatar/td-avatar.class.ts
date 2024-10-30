import { UI } from '../../../ui/ui.abstract';
import { ITdAvatar, ITdAvatarConfig } from './td-avatar.interface';
import { Img, TypeElement } from '@type-dom/framework';
import { $avatar, $avatarSize } from './td-avatar.style';
import { addUnit, isNumber } from '@type-dom/utils';

export class TdAvatar extends UI implements ITdAvatar {
  className: 'TdAvatar';
  override props: ITdAvatarConfig;
  private img?: Img;
  private hasLoadError: boolean;

  constructor(params: ITdAvatarConfig = {}) {
    super();
    this.useTag('span');
    this.className = 'TdAvatar';
    this.attr.addName('td-avatar');
    this.style.addObj({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      textAlign: 'center',
      overflow: 'hidden',
      // color: getCssVar('avatar', 'text-color'),
      color: $avatar.textColor,
      // background: getCssVar('avatar', 'bg-color'),
      background: $avatar.bgColor,
      // width: getCssVar('avatar', 'size'),
      width: $avatarSize.default,
      // height: getCssVar('avatar', 'size'),
      height: $avatarSize.default,
      // font-size: getCssVar('avatar', 'text-size'),
      fontSize: $avatar.textSize
    });
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
          height: '100%'
        },
        attrObj: {
          src: props.src
        }
      });
      this.addChild(this.img);
    } else if (props?.icon) {
      this.addChild(props.icon);
      this.style.addObj({
        fontSize: $avatar.iconSize
      });
    } else {
      if (props?.slot) {
        this.slotChild(props.slot);
      }
    }
    const fit = props?.fit || 'cover';
    this.img?.style.addObj({
      objectFit: fit
    });
    const shape = props?.shape || 'circle';
    this.style.addObj({
      borderRadius: shape === 'circle' ? '50%' : $avatar.borderRadius
    });
    const size = props?.size || 'default';
    if (isNumber(size)) {
      this.style.addObj({
        width: addUnit(size),
        height: addUnit(size)
      });
      this.img?.style.addObj({
        width: addUnit(size),
        height: addUnit(size)
      });
      if (props?.slot instanceof TypeElement) {
        props.slot.style.addObj({
          width: addUnit(size),
          height: addUnit(size)
        });
      }
    } else {
      this.style.addObj({
        width: $avatarSize[size],
        height: $avatarSize[size]
      });
      this.img?.style.addObj({
        width: $avatarSize[size],
        height: $avatarSize[size]
      });
      if (props?.slot instanceof TypeElement) {
        props.slot.style.addObj({
          width: $avatarSize[size],
          height: $avatarSize[size]
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
