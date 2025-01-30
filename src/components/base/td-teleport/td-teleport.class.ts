import { Teleport, TypeFragment } from '@type-dom/framework';
import { ITdTeleport, TeleportProps } from './td-teleport.interface';

export class TdTeleport extends TypeFragment implements ITdTeleport {
  className: 'TdTeleport';

  constructor(params: TeleportProps = {}) {
    super();
    this.className = 'TdTeleport';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props.disabled) {
      this.slotChildren(this.props.slot || props.slots?.default);
    } else {
      this.addChild(
        new Teleport({
          to: props.to,
          slot: this.props.slot || props.slots?.default,
        })
      );
    }
  }
}
