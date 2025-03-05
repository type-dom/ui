import { TypeHtml } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { isUndefined } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace';
import { useFormSize } from '../../form/td-form/hooks/use-form-common-props';
import { ITdText, ITdTextConfig } from './td-text.interface';
import { textProps } from './td-text.const';
import './style/index';

export class TdText extends TypeHtml implements ITdText {
  className: 'TdText';
  dom?: HTMLElement;
  override props: ITdTextConfig;

  constructor(params: ITdTextConfig = {}) {
    super();
    this.className = 'TdText';
    this.assignProps(textProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const textSize = useFormSize();
    const ns = useNamespace('text');

    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(textSize.get()),
      ns.is('truncated', props.truncated),
      ns.is('line-clamp', !isUndefined(props.lineClamp)),
    ]);
    this.attr.addClass(textKls);
    if (props.lineClamp) {
      // console.warn('then -webkit-line-clamp . ');
      this.style.addObj({
        // color: '#f00',
        '-webkit-line-clamp': props.lineClamp,
      });
    }
    this.slotChildren(props.slot);
  }
}
