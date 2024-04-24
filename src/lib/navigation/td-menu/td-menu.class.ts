import { UI } from '../../ui.abstract';
import { ITdMenu, ITdMenuConfig } from './td-menu.interface';
import { $borderColorHover, $borderColors } from '../../styles/var';

export class TdMenu extends UI implements ITdMenu {
  className: 'TdMenu';

  constructor(config?: ITdMenuConfig) {
    super({ tag: 'ul' });
    this.className = 'TdMenu';
    this.addAttrObj({
      role: 'menubar'
    });
    this.addStyleObj({
      // border-right: solid 1px var(--el-menu-border-color),
      borderRight: 'solid 1px ' + $borderColors.base,
      listStyle: 'none',
      position: 'relative',
      margin: '0',
      paddingLeft: '0',
      // background-color: var(--el-menu-bg-color),
      backgroundColor: $borderColors.base,
      boxSizing: 'border-box'
    });
    this.setConfig(config);
  }

  override setConfig(config?: ITdMenuConfig) {
    super.setConfig(config);
    const mode = config?.mode || 'vertical';
    if (mode === 'vertical') {
      this.addStyleObj({});
    } else {
      this.addStyleObj({
        display: 'flex',
        flexWrap: 'nowrap',
        borderRight: 'none'
        // height: var(--el-menu-horizontal-height),
      });
    }
  }
}
