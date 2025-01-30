import { defineExpose, TypeDiv } from '@type-dom/framework';
import { Signal } from '@type-dom/signals';
import { TdCollapseItem } from '../td-collapse-item/td-collapse-item.class';
import type {
  CollapseActiveName,
  ITdCollapse,
  CollapseProps,
} from './td-collapse.interface';
import { useCollapse, useCollapseDOM } from './use-collapse';
import { collapseEmits } from './td-collapse.const';
import './style/index';

export class TdCollapse extends TypeDiv implements ITdCollapse {
  className: 'TdCollapse';
  override props: CollapseProps;
  override childNodes: TdCollapseItem[];
  activeNames?: Signal<(string | number | undefined)[]>;
  setActiveNames?: (_activeNames: CollapseActiveName[]) => void;

  constructor(params: CollapseProps = {}) {
    super();
    this.className = 'TdCollapse';
    this.childNodes = [];

    this.addEmits(collapseEmits);
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdCollapse setup . ');
    const props = this.props;
    const emit = this.emit;

    const { activeNames, setActiveNames } = useCollapse(props, emit);

    const { rootKls } = useCollapseDOM();

    defineExpose({
      /** @description active names */
      activeNames,
      /** @description set active names */
      setActiveNames,
    });

    this.attr.addClass(rootKls);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
