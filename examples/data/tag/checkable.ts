import { Div, TypeDiv } from '@type-dom/framework';
import { TdCheckTag } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class TagCheckableExample extends TypeDiv {
  className = 'TagCheckableExample';

  constructor() {
    super();
    const $item = {
      display: 'flex',
      gap: '0.5rem',
      // margin: '1rem',
    };
    const checked = signal(false);
    const checked1 = signal(true);
    const checked2 = signal(true);
    const checked3 = signal(true);
    const checked4 = signal(true);
    const checked5 = signal(true);
    const checked6 = signal(true);

    const onChange = (status: boolean) => {
      checked.set(status);
    }

    const onChange1 = (status: boolean) => {
      checked1.set(status);
    }

    const onChange2 = (status: boolean) => {
      checked2.set(status);
    }

    const onChange3 = (status: boolean) => {
      checked3.set(status);
    }

    const onChange4 = (status: boolean) => {
      checked4.set(status);
    }

    const onChange5 = (status: boolean) => {
      checked5.set(status);
    }

    const onChange6 = (status: boolean) => {
      checked6.set(status);
    }

    this.addChild(new Div({
      name: 'checkable',
      styleObj: $item,
      slot: [
        new TdCheckTag({
          slot: 'Checked',
          checked: true,
        }),
        new TdCheckTag({
          slot: 'Toggle me',
          checked: checked,
          emits: {
            change: onChange,
          }
        }),
        new TdCheckTag({
          slot: 'Disabled',
          disabled: true,
        }),
      ]
    }));
    this.addChild(new Div({
      name: 'checkable',
      styleObj: $item,
      slot: [
        new TdCheckTag({
          type: 'primary',
          slot: 'Tag 1',
          checked: checked1,
          emits: {
            change: onChange1
          }
        }),
        new TdCheckTag({
          type: 'success',
          slot: 'Tag 2',
          checked: checked2,
          emits: {
            change: onChange2
          }
        }),
        new TdCheckTag({
          type: 'info',
          slot: 'Tag 3',
          checked: checked3,
          emits: {
            change: onChange3
          }
        }),
        new TdCheckTag({
          type: 'warning',
          slot: 'Tag 4',
          checked: checked4,
          emits: {
            change: onChange4
          }
        }),
        new TdCheckTag({
          type: 'danger',
          slot: 'Tag 5',
          checked: checked5,
          emits: {
            change: onChange5
          }
        }),
        new TdCheckTag({
          checked: checked6,
          disabled: true,
          type: 'success',
          emits: {
            change: onChange6
          },
          slot: 'Tag 6',
        })
      ]
    }));
  }
}
