import { Br, Div, TypeDiv, TypeSvgSvg } from '@type-dom/framework';
import { ComponentSize, TdIcon, TdSegmented } from '@type-dom/ui';
import { ElAppleSvg, ElCherrySvg, ElGrapeSvg, ElOrangeSvg, ElPearSvg, ElWatermelonSvg } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';

export class SegmentedCustomDirectionExample extends TypeDiv {
  className = 'SegmentedCustomDirectionExample';

  constructor() {
    super();

    const value = signal('Apple');
    const direction = signal<'vertical' | 'horizontal'>('vertical')
    const size = signal<ComponentSize>('default')

    const directionOptions = [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ]

    const sizeOptions = ['large', 'default', 'small']

    const options: { label: string; value: string; icon: TypeSvgSvg; slot: Div }[] = [
      {
        label: 'Apple',
        value: 'Apple',
        icon: new ElAppleSvg(),
      },
      {
        label: 'Cherry',
        value: 'Cherry',
        icon: new ElCherrySvg(),
      },
      {
        label: 'Grape',
        value: 'Grape',
        icon: new ElGrapeSvg(),
      },
      {
        label: 'Orange',
        value: 'Orange',
        icon: new ElOrangeSvg(),
      },
      {
        label: 'Pear',
        value: 'Pear',
        icon: new ElPearSvg(),
      },
      {
        label: 'Watermelon',
        value: 'Watermelon',
        icon: new ElWatermelonSvg(),
      },
    ].map(opt => {
      return {
        ...opt,
        slot: new Div({
          // class: 'flex flex-col items-center gap-2 p-2',
          styleObj: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // padding: '0.5rem',
            gap: '0.5rem',
          },
          class: computed(() => direction.get() === 'horizontal' && 'p-2'),
          slot: [
            new TdIcon({
              size: 20,
              slot: opt.icon,
            }),
            new Div({
              slot: opt.label,
            }),
          ],
        }),
      };
    });
    this.addChildren(
      new TdSegmented({
        vModel: size,
        options: sizeOptions,
        styleObj: {
          marginBottom: '1rem'
        }
      }),
      new Br(),
      new TdSegmented({
        vModel: direction,
        options: directionOptions,
        styleObj: {
          marginBottom: '1rem'
        }
      }),
      new Br(),
      new TdSegmented({
        vModel: value,
        options: options,
        direction: direction,
        size: size,
      }),
    )
  }
}
