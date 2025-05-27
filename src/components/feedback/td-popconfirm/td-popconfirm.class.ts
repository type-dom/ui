import { Div, StyleValue, SvgSvg, TypeFragment } from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { addUnit, isFunction } from '@type-dom/utils';
import { useLocale } from '../../../hooks/use-locale';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdButton } from '../../basic/td-button/td-button.class';
import { TdTooltip } from '../td-tooltip/td-tooltip.class';
import { ITdPopconfirm, PopconfirmProps } from './td-popconfirm.interface';
import { popconfirmEmits, popconfirmProps } from './td-popconfirm.const';
import './style';

export class TdPopconfirm extends TypeFragment implements ITdPopconfirm {
  className: 'TdPopconfirm';
  override props: PopconfirmProps;

  constructor(params: PopconfirmProps = {}) {
    super();
    this.className = 'TdPopconfirm';

    this.addEmits(popconfirmEmits);
    this.assignProps(popconfirmProps);
    this.props = this.useParams(params);
  }

  override setup() {

    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale()
    const ns = useNamespace('popconfirm')
    const tooltipRef = signal<TdTooltip>()

    const hidePopper = () => {
      tooltipRef.get()?.onClose?.()
    }

    const style = computed(() => {
      return {
        width: addUnit(props.width),
      }
    })

    const confirm = (e?: MouseEvent) => {
      emit('confirm', e)
      hidePopper()
    }
    const cancel = (e?: MouseEvent) => {
      // console.warn('cancel . ');
      emit('cancel', e)
      hidePopper()
    }

    const finalConfirmButtonText = computed(
      () => props.confirmButtonText || t('el.popconfirm.confirmButtonText')
    )
    const finalCancelButtonText = computed(
      () => props.cancelButtonText || t('el.popconfirm.cancelButtonText')
    )

    this.addChildren(
      new TdTooltip({
        refEl: tooltipRef,
        trigger: 'click',
        effect: 'light',
        // v-bind="$attrs"
        placement: props.placement, // add by me base on attr
        popperClass: `${ns.namespace.get()}-popover`,
        popperStyle: style as StyleValue,
        teleported: props.teleported,
        fallbackPlacements: ['bottom', 'top', 'right', 'left'],
        hideAfter: props.hideAfter,
        persistent: props.persistent,
        slots: {
          content: new Div({
            class: ns.e(),
            slot: [
              new Div({
                class: ns.e('main'),
                slot: [
                  new TdIcon({
                    vIf: !props.hideIcon && props.icon,
                    class: ns.e('icon'),
                    slot: new (props.icon as typeof SvgSvg)(),
                    styleObj: {
                      color: props.iconColor
                    }
                  }),
                  props.title
                ]
              }),
              new Div({
                class: ns.e('action'),
                slot: isFunction(props.slots?.actions) ? props.slots?.actions(confirm, cancel)
                  : [
                    new TdButton({
                      size: 'small',
                      type: props.cancelButtonType === 'text' ? '' : props.cancelButtonType,
                      text: props.cancelButtonType === 'text',
                      slot: finalCancelButtonText,
                      events: {
                        click: cancel
                      }
                    }),
                    new TdButton({
                      size: 'small',
                      type: props.confirmButtonType === 'text' ? '' : props.confirmButtonType,
                      text: props.confirmButtonType === 'text',
                      slot: finalConfirmButtonText,
                      events: {
                        click: confirm
                      }
                    })
                  ]
              })
            ]
          }),
          default: props.slots?.reference,
        }
      })
    )
  }
}
