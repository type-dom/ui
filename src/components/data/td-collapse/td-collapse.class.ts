import { isArray } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import { TdCollapseItem } from '../td-collapse-item/td-collapse-item.class';
import type {
  ICollapseActiveName,
  ITdCollapse,
  ITdCollapseConfig
} from './td-collapse.interface';
import { $collapse } from './td-collapse.style';

export class TdCollapse extends UI implements ITdCollapse {
  className: 'TdCollapse';
  override props: ITdCollapseConfig
  override childNodes: TdCollapseItem[];
  private activeNames: ICollapseActiveName[];

  constructor(params: ITdCollapseConfig = {}) {
    super();
    this.className = 'TdCollapse';
    this.childNodes = [];
    this.style.addObj({
      //   border-top: 1px solid getCssVar('collapse-border-color');
      borderTop: '1px solid ' + $collapse.borderColor,
      // border-bottom: 1px solid getCssVar('collapse-border-color');
      borderBottom: '1px solid ' + $collapse.borderColor
    });
    this.activeNames = isArray(params?.modelValue)
      ? params!.modelValue as ICollapseActiveName[]
      : [params?.modelValue ?? ''];

    this.props = this.useParams(params);
  }

  override mounted() {
    this.setActiveNames(this.activeNames);
  }

  // get name() {
  //   return this.props.name ??
  // }
  setActiveNames(activeNames: ICollapseActiveName[]) {
    // this.activeNames = activeNames;
    // if (this.props.accordion) {
    //   this.activeNames = activeNames[0];
    // }
    this.activeNames = activeNames;
    console.log('this.activeNames is ', this.activeNames);
    if (activeNames) {
      if (this.props.accordion) {
        this.childNodes.forEach((item) => {
          if (item.props.nameId === activeNames[0]) {
            item.setActive(true);
          } else {
            item.setActive(false);
          }
        });
      } else {
        this.childNodes.forEach((item) => {
          if (activeNames && item.props?.nameId) {
            if (activeNames.includes(item.props.nameId)) {
              item.setActive(true);
            } else {
              item.setActive(false);
            }
          }
        });
      }
    }
  }

  handleItemClick(name: ICollapseActiveName) {
    console.log('handleItemClick, name is ', name);
    if (this.props?.accordion) {
      this.setActiveNames([this.activeNames[0] === name ? '' : name]);
    } else {
      const _activeNames = [...this.activeNames];
      const index = _activeNames.indexOf(name);

      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      this.setActiveNames(_activeNames);
    }
  }
}
