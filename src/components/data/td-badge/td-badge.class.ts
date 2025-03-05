import { computed, unref } from '@type-dom/signals';
import { addUnit, isNumber } from '@type-dom/utils';
import { Sup, Transition, TypeDiv } from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { BadgeProps, ITdBadge } from './td-badge.interface';
import { badgeProps } from './td-badge.const';
import './style/index';

export class TdBadge extends TypeDiv implements ITdBadge {
  className: 'TdBadge';
  override props: BadgeProps;

  constructor(params: BadgeProps = {}) {
    super();
    // console.log('TdBadge constructor . ');
    this.className = 'TdBadge';
    this.attr.addName('td-badge');
    this.assignProps(badgeProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('TdBadge setup');
    const props = this.props;

    const ns = useNamespace('badge');

    const content = computed<string>(() => {
      if (props.isDot) return '';
      if (isNumber(unref(props.value)) && isNumber(props.max)) {
        return props.max < Number(unref(props.value))
          ? `${props.max}+`
          : `${unref(props.value)}`;
      }
      return `${unref(props.value)}`;
    });

    const style = computed(() => {
      return {
        backgroundColor: props.color,
        marginRight: addUnit(-(props.offset?.[0] ?? 0)),
        marginTop: addUnit(props.offset?.[1] ?? 0),
        ...(props.badgeStyle ?? {}),
      };
    });
    this.attr.addClass(ns.b());
    this.slotChildren(props.slot);
    this.addChild(
      new Transition({
        name: `${ns.namespace.get()}-zoom-in-center`,
        slot: new Sup({
          vShow: computed(
            () =>
              !props.hidden &&
              (content.get() || props.isDot || props.slots?.content)
          ),
          class: [
            ns.e('content'),
            ns.em('content', props.type),
            ns.is('fixed', !!(props.slots?.default || props.slot)),
            ns.is('dot', props.isDot),
            ns.is('hide-zero', !props.showZero && unref(props.value) === 0),
            props.badgeClass,
          ],
          styleObj: style.get(),
          slot: props.slots?.content ?? content,
        }),
      })
    );
  }
}
