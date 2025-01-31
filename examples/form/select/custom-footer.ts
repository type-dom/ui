import { ISlots, TypeDiv } from '@type-dom/framework';
import {
  CheckboxValueType,
  TdButton,
  TdInput,
  TdOption,
  TdSelect,
} from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectCustomFooterExample extends TypeDiv {
  className: 'SelectCustomFooterExample';

  constructor() {
    super();
    this.className = 'SelectCustomFooterExample';

    const isAdding = signal(false)
    const value = signal<CheckboxValueType[]>([])
    const optionName = signal('')
    const cities = [
      {
        value: 'Beijing',
        label: 'Beijing',
      },
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Nanjing',
        label: 'Nanjing',
      },
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
    ];
    const onAddOption = () => {
      isAdding.set(true);
    };

    const onConfirm = () => {
      if (optionName) {
        cities.push({
          label: optionName.get(),
          value: optionName.get(),
        });
        clear();
      }
    };

    const clear = () => {
      optionName.set('');
      isAdding.set(false);
    };
    this.addChildren(
      new TdSelect({
        vModel: value,
        clearable: true,
        placeholder: 'Select',
        styleObj: {
          width: 240,
        },
        slot: cities.map((opt) => {
          const slots: ISlots = {};
          if (isAdding) {
            slots.footer = [
              new TdInput({
                vModel: optionName,
                styleObj: {
                  width: '100%',
                  marginBottom: '8px',
                },
              }),
              new TdButton({
                text: true,
                bg: true,
                type: 'primary',
                size: 'small',
                slot: 'confirm',
                events: {
                  click: onConfirm,
                },
              }),
              new TdButton({
                size: 'small',
                slot: 'cancel',
                events: {
                  click: clear,
                },
              }),
            ];
          } else {
            slots.footer = new TdButton({
              text: true,
              bg: true,
              size: 'small',
              events: {
                click: onAddOption,
              },
            });
          }
          return new TdOption({
            label: opt.label,
            value: opt.value,
            slots,
          });
        }),
      })
    );
  }
}
