import { Div, TypeDiv, useDark } from '@type-dom/framework';
import { TdButton } from '@type-dom/ui';

export class ButtonCustomExamples extends TypeDiv {
  className = 'ButtonCustomExamples';

  constructor() {
    super();
    const isDark = useDark({
      storageKey: 'vitepress-theme-appearance',
    }).get();

    // const toggleDark = useToggle(isDark)
    this.addChildren(
      new Div({
        slot: [
          new TdButton({
            color: '#626aef',
            dark: isDark,
            slot: 'Default',
          }),
          new TdButton({
            color: '#626aef',
            dark: isDark,
            plain: true,
            slot: 'Plain',
          }),
          new TdButton({
            color: '#626aef',
            dark: isDark,
            disabled: true,
            slot: 'Disabled',
          }),
          new TdButton({
            color: '#626aef',
            dark: isDark,
            disabled: true,
            plain: true,
            slot: 'Disabled Plain',
          }),
        ]
      })
    )
  }
}
