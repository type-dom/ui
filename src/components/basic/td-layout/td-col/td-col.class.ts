import { formatFloat, isNumber, isObject } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { computed } from '@type-dom/signals';
import { inject, TypeDiv, TypeElement } from '@type-dom/framework';
import { useNamespace } from '../../../../hooks/use-namespace';
import { rowContextKey } from '../td-row/td-row.const';
import { TdRow } from '../td-row/td-row.class';
import { ColProps, ColSize, ITdCol } from './td-col.interface';
import { colProps } from './td-col.const';
import './style/index';

export class TdCol extends TypeDiv implements ITdCol {
  className: 'TdCol';
  override parent?: TdRow;
  override props: ColProps;

  constructor(params: ColProps = {}) {
    super();
    this.className = 'TdCol';
    this.attr.addName('td-col');
    this.assignProps(colProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const { gutter } = inject(rowContextKey, {
      gutter: computed(() => 0 as number | undefined),
    });
    const ns = useNamespace('col');

    const style = computed(() => {
      const styles: IStyle = {};
      if (gutter.get()) {
        styles.paddingLeft = styles.paddingRight = `${gutter.get()! / 2}px`;
      }
      return styles;
    });

    const colKls = computed(() => {
      const classes: string[] = [];
      const pos = ['span', 'offset', 'pull', 'push'] as const;

      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === 'span') classes.push(ns.b(`${props[prop]}`));
          else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject(props[size])) {
          Object.entries(props[size] as ColSize).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== 'span'
                ? ns.b(`${size}-${prop}-${sizeProp}`)
                : ns.b(`${size}-${sizeProp}`)
            );
          });
        }
      });

      // this is for the fix
      if (gutter.get()) {
        classes.push(ns.is('guttered'));
      }
      console.error('classes is ', classes);
      return [ns.b(), classes];
    });

    this.attr.addClass(colKls);
    this.style.addObj(style);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
