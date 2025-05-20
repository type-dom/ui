import { TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class InputFormatterExample extends TypeDiv {
  className = 'InputFormatterInputFormat';

  constructor() {
    super();
    const input = signal('');
    this.addChild(
      new TdInput({
        vModel: input,
        styleObj: {
          width: 240,
        },
        // :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        // :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        formatter: (value: string) => {
          return '$ ' + value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        parser: (value: string) => {
          return value.replace(/\$\s?|(,*)/g, '');
        },
      })
    );
  }
}
