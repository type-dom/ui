import { Div, Span } from '@type-dom/framework';
import { ElPlusSvg } from '@type-dom/svgs';
import { isUndefined } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
// import { $colorPrimary, $colors, $textColor } from '../../../styles';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdTabPaneConfig } from './td-tab-pane.interface';
import { ITabPaneName, ITdTabs, ITdTabsConfig } from './td-tabs.interface';
import { TdTabNav } from './td-tab-nav.class';
import {
  $tabsContentStyle,
  $tabsHeaderStyle,
  $tabsHeaderVerticalStyle,
  $tabsItemStyle,
  $tabsNavStyle,
  $tabsStyle
} from './td-tabs.style';
import { TdTabPane } from './td-tab-pane.class';

export class TdTabs extends UI implements ITdTabs {
  className: 'TdTabs';
  override props: ITdTabsConfig
  currentName: ITabPaneName;
  tabNav: TdTabNav;
  private newBtn?: Span;
  private header: Div;
  private panel: Div;

  constructor(params: ITdTabsConfig = {}) {
    super();
    this.className = 'TdTabs';
    this.attr.addName('td-tabs');
    // this.style.addObj($tabsStyle);
    this.currentName = params?.modelValue || '';
    this.header = new Div({
      className: 'header',
      styleObj: $tabsHeaderStyle
    });
    //   isVertical.value && ns.e('header-vertical'),
    //             ns.is(props.tabPosition),
    const tabPosition = params?.tabPosition || 'top';
    const isVertical = ['left', 'right'].includes(tabPosition);
    if (isVertical) {
      this.header.style.addObj($tabsHeaderVerticalStyle);
    }

    if (params?.editable || params?.addable) {
      this.newBtn = new Span({
        className: 'new-btn'
      });
      if (params?.slots?.addIcon) {
        this.newBtn.slotChild(params.slots.addIcon);
      } else {
        this.newBtn.addChild(new TdIcon({
          name: 'icon-plus',
          // styleObj: $tabsIconPlusStyle,
          svgObj: new ElPlusSvg()
        }));
      }
    }
    const panes = params?.slot?.map((pane: TdTabPane, index: number) => pane.params) as ITdTabPaneConfig[];
    this.tabNav = new TdTabNav({
      rootTabs: this,
      editable: params?.editable,
      type: params?.type,
      panes: panes,
      stretch: params?.stretch,
      styleObj: $tabsNavStyle,
      emits: {
        tabClick: (pane: ITdTabPaneConfig, tabName: ITabPaneName, ev: Event) => {
          this.handleTabClick(pane, tabName, ev)
        },
        tabRemove: (pane: ITdTabPaneConfig, ev: Event) => {
          this.handleTabRemove(pane, ev);
        },
      }
    });
    this.header.addChild(this.tabNav);
    if (this.newBtn) {
      this.header.addChild(this.newBtn);
    }
    this.panel = new Div({
      className: 'panels',
      attrObj: {
        name: 'td-tabs-content',
      },
      styleObj: { ...$tabsContentStyle, ...params?.contentStyle, },
    });
    if (params?.slot) {
      params.slot.forEach((pane: TdTabPane, index: number) => {
        const tabName = pane.props.name ?? (index + 1);
        if (tabName === this.currentName) {
          pane.setActive(true);
        } else {
          pane.setActive(false);
        }
        this.panel.addChild(pane);
      })
    }
    if (params?.tabPosition !== 'bottom') {
      this.childNodes = [this.header, this.panel];
    } else {
      this.childNodes = [this.panel, this.header];
    }
    this.props = this.useParams(params);
  }

  async setCurrentName(value?: ITabPaneName, trigger = false) {
    console.log('setCurrentName .');
    // should do nothing.
    if (this.currentName === value || isUndefined(value)) return;

    try {
      const canLeave: boolean | void | undefined = await this.props.beforeLeave?.(value, this.currentName)
      if (canLeave !== false) {
        this.currentName = value
        if (trigger) {
          this.emit(UPDATE_MODEL_EVENT, value)
          // this.props.emits?.[UPDATE_MODEL_EVENT]?.(value);
          this.emit('tabChange', value)
          // this.props.emits?.tabChange?.(value);
        }
        this.props.slot?.forEach((pane: TdTabPane, index: number) => {
          const tabName = pane.props.name ?? (index + 1);
          if (tabName === this.currentName) {
            pane.setActive(true);
          } else {
            pane.setActive(false);
          }
        })
        this.tabNav?.removeFocus?.()
      }
    } catch {
      console.error('tab change error');
    }
  }

  handleTabClick(
    tab: ITdTabPaneConfig,
    tabName: ITabPaneName,
    event: Event
  ) {
    console.log('handleTabClick . ');
    if (tab.disabled) return;
    this.setCurrentName(tabName, true);
    this.emit('tabClick', tab, event);
    // this.props.emits?.tabClick?.(tab, event);
  }

  handleTabRemove(pane: ITdTabPaneConfig, ev: Event) {
    if (pane.disabled || isUndefined(pane.name)) return;
    ev.stopPropagation();
    this.emit('edit', pane.name, 'remove')
    // this.props.emits?.edit?.(pane.name, 'remove');
    this.emit('tabRemove', pane.name)
    // this.props.emits?.tabRemove?.(pane.name);
  }

  handleTabAdd() {
    this.emit('edit', undefined, 'add')
    // this.props.emits?.edit?.(undefined, 'add');
    this.emit('tabAdd')
    // this.props.emits?.tabAdd?.();
  }
}
