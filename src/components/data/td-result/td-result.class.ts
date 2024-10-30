import { Div, P, SlotNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdResult, ITdResultConfig } from './td-result.interface';
import {
  $icon,
  $result,
  $extraStyle,
  $subTitleStyle,
  $subTitlePStyle,
  $titlePStyle,
  $titleStyle
} from './td-result.style';
import { IconComponentMap, IconMap } from './td-result.constant';

export class TdResult extends UI implements ITdResult {
  className: 'TdResult';
  override props: ITdResultConfig;
  // private iconSlot?: SlotNode;
  // private titleSlot?: SlotNode;

  constructor(params: ITdResultConfig = {}) {
    super();
    this.className = 'TdResult';
    this.attr.addName('td-result');
    this.style.addObj({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      boxSizing: 'border-box',
      // padding: getCssVar('result-padding'),
      padding: $result.padding
    });
    // this.iconSlot = new SlotNode('icon');
    this.addChild(
      new Div({
        name: 'icon',
        childNodes: [this.getSlotNode('icon')]
      })
    );
    if (!params?.slots?.icon) {
      const resultIcon = this.resultIcon(params);
      this.getSlotNode('icon').addSlot(resultIcon);
    }
    if (params?.slots?.title || params?.title) {
      // this.titleSlot = new SlotNode('title');
      this.addChild(
        new Div({
          name: 'title',
          styleObj: $titleStyle,
          childNodes: [this.getSlotNode('title')]
        })
      );
      if (!params.slots?.title) {
        this.getSlotNode('title').addSlot(
          new P({
            name: 'title',
            text: params.title,
            styleObj: $titlePStyle
          })
        );
      }
    }
    if (params?.slots?.subTitle || params?.subTitle) {
      // const subTitleSlot = new SlotNode('sub-title');
      this.addChild(
        new Div({
          name: 'sub-title',
          styleObj: $subTitleStyle,
          childNodes: [this.getSlotNode('subTitle')],
        })
      );
      if (params.slots?.subTitle) {

      } else {
        this.getSlotNode('subTitle').addSlot(
          new P({
            name: 'sub-title',
            text: params.subTitle,
            styleObj: $subTitlePStyle
          })
        );
      }
    }
    if (params?.slots?.extra) {
      // const extraSlot = new SlotNode('extra');
      this.addChild(
        new Div({
          styleObj: $extraStyle,
          childNodes: [this.getSlotNode('extra')]
        })
      );
      // this.getSlotNode('extra').addSlot(params.slots.extra);
    }
    this.props = this.useParams(params);
  }

  resultIcon(params?: ITdResultConfig) {
    const icon = params?.icon;
    const iconClass = icon && IconMap[icon] ? IconMap[icon] : 'icon-info';
    return IconComponentMap[iconClass] || IconComponentMap['icon-info'];
  }
}
