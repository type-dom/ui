import { TypeUL, UL } from '@type-dom/framework';
import { $borderColorHover, $borderColor } from '../../../styles/var';
import { ITdMenu, MenuProps } from './td-menu.interface';

export class TdMenu extends TypeUL implements ITdMenu {
  className: 'TdMenu';
  override props: MenuProps;

  constructor(params = {} as MenuProps) {
    super();
    // this.useTag('ul');
    this.className = 'TdMenu';
    this.attr.addObj({
      name: 'td-menu',
      role: 'menubar',
    });
    this.style.addObj({
      // border-right: solid 1px var(--el-menu-border-color),
      borderRight: 'solid 1px ' + $borderColor.base,
      listStyle: 'none',
      position: 'relative',
      margin: '0',
      paddingLeft: '0',
      // background-color: var(--el-menu-bg-color),
      backgroundColor: $borderColor.base,
      boxSizing: 'border-box',
    });

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const mode = props.mode || 'vertical';
    if (mode === 'vertical') {
      this.style.addObj({});
    } else {
      this.style.addObj({
        display: 'flex',
        flexWrap: 'nowrap',
        borderRight: 'none',
        // height: var(--el-menu-horizontal-height),
      });
    }
  }
}
