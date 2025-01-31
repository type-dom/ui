import { createClass, TypeDiv } from '@type-dom/framework';
import { TdSegmented } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SegmentedCustomStyleExample extends TypeDiv {
  className = 'SegmentedCustomStyleExample';

  constructor() {
    super();
    const value = signal('Delicacy')
    const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket'];
    createClass('custom-style td-segmented', {
      '--td-segmented-item-selected-color': 'var(--td-text-color-primary)',
      '--td-segmented-item-selected-bg-color': '#ffd100',
      '--td-border-radius-base': '16px',
    } as any)
    // 在 styles.scss中定义 custom-style
    this.attr.addClass('custom-style');
    this.addChild(
      new TdSegmented({
        vModel: value,
        options: options,
      })
    )
  }
}
