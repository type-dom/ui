import { Div, TypeDiv } from '@type-dom/framework';
import { TagProps, TdTag } from '@type-dom/ui';

interface TagsItem {
  name: string
  type: TagProps['type']
}

export class TagRemovableExample extends TypeDiv {
  className = 'TagRemovableExample';

  constructor() {
    super();
    const tags: TagsItem[] = [
      { name: 'Tag 1', type: 'primary' },
      { name: 'Tag 2', type: 'success' },
      { name: 'Tag 3', type: 'info' },
      { name: 'Tag 4', type: 'warning' },
      { name: 'Tag 5', type: 'danger' },
    ];
    this.addChild(new Div({
      name: 'removable',
      styleObj: {
        display: 'flex',
        gap: '0.5rem',
      },
      slot: tags.map(tag => new TdTag({
        type: tag.type,
        slot: tag.name,
        closable: true,
      })),
    }));
  }
}
