import { TypeProps, TypeDiv } from '@type-dom/framework';
import { $bgColor } from '../../../styles/var';
import { Example } from './example';

export class ExampleShowcase extends TypeDiv {
  className: 'ExampleShowcase';
  override parent?: Example = undefined;

  constructor(params: TypeProps) {
    super();
    this.className = 'ExampleShowcase';
    this.attr.addName('example-showcase');
    this.style.addObj({
      padding: '1.5rem',
      margin: '.5px',
      // background-color: var(--bg-color),
      backgroundColor: $bgColor.default,
    });
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
