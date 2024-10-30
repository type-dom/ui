import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../td-icon/td-icon.class';
import { $baseText, $textStateColors, sizeOpts } from './td-text.style';
import { ITdText, ITdTextConfig } from './td-text.interface';

export class TdText extends UI implements ITdText {
  className: 'TdText';
  override props: ITdTextConfig;
  icon?: TdIcon;

  constructor(params: ITdTextConfig = {}) {
    super();
    this.useTag(params?.tag || 'span');
    this.className = 'TdText';
    this.style.addObj($baseText);
    this.props = this.useParams(params);
    // this.addChild(this.getSlotNode());
    if (params.slot) {
      this.slotChild(params.slot);
    }
  }

  override setup() {
    const props = this.props;
    if (props?.type) {
      this.style.addObj($textStateColors[props.type].default);
    } else {
      this.style.addObj($textStateColors.default.default);
    }
    if (props?.size) {
      this.style.addObj(sizeOpts[props?.size]);
    } else {
      this.style.addObj(sizeOpts.default);
    }
    if (props?.truncated && props?.width) {
      this.style.addObj({
        display: 'inline-block',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: props?.width
      });
    }
    if (props?.lineClamp) {
      this.style.addObj({
        // '-webkit-line-clamp': props?.lineClamp,
        WebkitLineClamp: props?.lineClamp,
        display: '-webkit-inline-box',
        // '-webkit-box-orient': 'vertical',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      });
    }
  }
}
