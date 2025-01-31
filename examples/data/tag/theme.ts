import { Div, TypeDiv } from '@type-dom/framework';
import { IType, TdTag } from '@type-dom/ui';

export class TagThemeExample extends TypeDiv {
  className = 'TagThemeExample';

  constructor() {
    super();
    const $item = {
      display: 'flex',
      gap: '0.5rem',
      // padding: '1.5rem',
      margin: '0.5rem'
    };

    const items : Array<{ type: IType, label: string }> = [
      { type: 'primary', label: 'Tag 1' },
      { type: 'success', label: 'Tag 2' },
      { type: 'info', label: 'Tag 3' },
      { type: 'warning', label: 'Tag 4' },
      { type: 'danger', label: 'Tag 5' },
    ];
    const darkList: TdTag[] = [];
    const lightList: TdTag[] = [];
    const plainList: TdTag[] = [];
    for (const item of items) {
      darkList.push(new TdTag({
        type: item.type,
        slot: item.label,
        effect: 'dark',
      }));
      lightList.push(new TdTag({
        type: item.type,
        slot: item.label,
        effect: 'light',
      }));
      plainList.push(new TdTag({
        type: item.type,
        slot: item.label,
        effect: 'plain',
      }));
    }

    this.addChild(new Div({
      name: 'Dark',
      styleObj: $item,
      slot: [ 'Dark', ...darkList],
    }));

    this.addChild(new Div({
      name: 'Light',
      styleObj: $item,
      slot: ['Light', ...lightList],
    }));

    this.addChild(new Div({
      name: 'Plain',
      styleObj: $item,
      slot:['Plain', ...plainList],
    }));
  }
}
