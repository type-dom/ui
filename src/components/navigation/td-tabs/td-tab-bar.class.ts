import { IStyle } from '@type-dom/css-type';
import { capitalize } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import { ITdTabBar, ITdTabBarConfig } from './td-tab-bar.interface';
import { $tabsActiveBarStyle } from './td-tabs.style';
import { TdTabs } from './td-tabs.class';

export class TdTabBar extends UI implements ITdTabBar {
  className: 'TdTabBar';
  override props: ITdTabBarConfig
  // barRef?: TdTabBar; // this
  barStyle?: IStyle;
  private rootTabs?: TdTabs;

  constructor(params: ITdTabBarConfig) {
    super();
    this.className = 'TdTabBar';
    this.attr.addName('td-tab-bar');
    this.style.addObj($tabsActiveBarStyle);
    this.rootTabs = params?.rootTabs;

    this.props = this.useParams(params);
  }

  getBarStyle(): IStyle {
    console.log('getBarStyle . ');
    let offset = 0;
    let tabSize = 0;

    const sizeName = ['top', 'bottom'].includes(
      this.rootTabs?.props.tabPosition || 'top'
    )
      ? 'width'
      : 'height';
    const sizeDir = sizeName === 'width' ? 'x' : 'y';
    const position = sizeDir === 'x' ? 'left' : 'top';

    this.props.tabs && this.props.tabs.every((tab, index) => {
      // const $el = instance.parent?.refs?.[`tab-${tab.uid}`] as HTMLElement
      const $el = this.rootTabs?.tabNav.tabs && this.rootTabs?.tabNav.tabs.find(
        (node) => node.attr.get('tabName') === (tab.name ?? (index + 1))
      )?.dom;
      console.log('$el is ', $el);
      if (!$el) return false;
      const tabName = tab.name ?? (index + 1);
      if (tabName !== this.rootTabs?.currentName) {
        return true;
      }

      offset =
        $el[`offset${capitalize(position)}` as 'offsetLeft' | 'offsetTop'];
      tabSize =
        $el[`client${capitalize(sizeName)}` as 'clientWidth' | 'clientHeight'];

      const tabStyles = window.getComputedStyle($el);
      // console.log('tabStyle is ', tabStyles);

      if (sizeName === 'width') {
        tabSize -=
          Number.parseFloat(tabStyles.paddingLeft) +
          Number.parseFloat(tabStyles.paddingRight);
        offset += Number.parseFloat(tabStyles.paddingLeft);
      }
      return false;
    });

    return {
      [sizeName]: `${tabSize}px`,
      transform: `translate${capitalize(sizeDir)}(${offset}px)`,
    };
  }

  change() {
    console.log('update . ');
    this.barStyle = this.getBarStyle();
    this.style.setObj(this.barStyle);
  }
}
