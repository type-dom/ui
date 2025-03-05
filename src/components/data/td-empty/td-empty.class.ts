import { ITdEmpty, EmptyProps } from './td-empty.interface';
import { Div, Img, P, TypeDiv } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { addUnit } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace';
import { useLocale } from '../../../hooks/use-locale';
import { emptyProps } from './td-empty.const';
import { ImgEmpty } from './img-empty.class';
import './style/index';

export class TdEmpty extends TypeDiv implements ITdEmpty {
  className: 'TdEmpty';
  override props: EmptyProps;

  constructor(params: EmptyProps = {}) {
    super();
    this.className = 'TdEmpty';
    this.attr.addName('td-empty');
    this.assignProps(emptyProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const { t } = useLocale()
    const ns = useNamespace('empty');
    const emptyDescription = computed(
      () => props.description || t('el.table.emptyText')
    );

    const imageStyle = computed<IStyle>(() => ({
      width: addUnit(props.imageSize),
    }));

    this.attr.addClass(ns.b());
    this.addChild(
      new Div({
        class: ns.e('image'),
        styleObj: imageStyle,
        slot: props.image
          ? new Img({
              attrObj: {
                src: props.image,
              },
              events: {
                dragstart: () => false,
              },
            })
          : props.slots?.image ?? new ImgEmpty(),
      })
    );
    this.addChild(
      new Div({
        class: ns.e('description'),
        slot: props.slots?.description ?? new P({ slot: emptyDescription }),
      })
    );
    if (props.slot || props.slots?.default) {
      this.addChild(
        new Div({
          class: ns.e('bottom'),
          slot: props.slot || props.slots?.default,
        })
      );
    }
  }
}
