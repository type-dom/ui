import {
  defineExpose,
  inject,
  Button,
  Div,
  Footer,
  Fragment,
  Header,
  Span,
  SvgSvg,
  TypeDiv,
} from '@type-dom/framework';
import { CloseComponents } from '@type-dom/svgs';
import { computed, unref } from '@type-dom/signals';
import { useLocale } from '../../../hooks/use-locale';
import { useDraggable } from '../../../hooks/use-draggable';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { dialogInjectionKey } from '../td-dialog/constants';
import { FOCUS_TRAP_INJECTION_KEY } from '../td-focus-trap/tokens';
import { DialogProps } from '../td-dialog/td-dialog.interface';
import {
  ITdDialogContent,
  DialogContentProps,
} from './td-dialog-content.interface';
import {
  dialogContentEmits,
  dialogContentProps,
} from './td-dialog-content.const';
import { composeRefs } from '../../../utils/refs';

export class TdDialogContent extends TypeDiv implements ITdDialogContent {
  className: 'TdDialogContent';
  override props: DialogContentProps;
  resetPosition?: () => void;

  constructor(params: DialogProps & DialogContentProps = {}) {
    super();
    this.className = 'TdDialogContent';
    this.addEmits(dialogContentEmits);
    this.assignProps(dialogContentProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const { t } = useLocale();
    const { Close } = CloseComponents;
    const props = this.props;
    const emit = this.emit;

    const { dialogRef, headerRef, bodyId, ns, style } =
      inject(dialogInjectionKey)!;
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY)!;

    const dialogKls = computed(() => [
      ns.b(),
      ns.is('fullscreen', props.fullscreen),
      ns.is('draggable', unref(props.draggable)),
      ns.is('align-center', props.alignCenter),
      { [ns.m('center')]: props.center },
    ]);

    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);

    const draggable = computed(() => unref(props.draggable));
    // console.log('draggable is ', draggable.get());
    const overflow = computed(() => props.overflow);
    const { resetPosition } = useDraggable(
      dialogRef,
      headerRef,
      draggable,
      overflow
    );

    defineExpose({
      resetPosition,
    });

    this.attr.addObj({
      tabindex: '-1',
    });
    this.assignProps({
      // refDom: composedDialogRef,
      refDom: dialogRef,
    });
    // console.log('then addClass dialogKls is ', dialogKls.get());
    this.attr.addClass(dialogKls);
    this.style.addObj(style);
    this.addChildren(
      new Header({
        refDom: headerRef,
        class: [
          ns.e('header'),
          props.headerClass,
          { 'show-close': props.showClose },
        ],
        slot: [
          new Fragment({
            slot: props.slots?.header
              ? props.slots?.header
              : new Span({
                  slot: props.title,
                  class: ns.e('title'),
                  attrObj: {
                    role: 'heading',
                    ariaLevel: props.ariaLevel,
                  },
                }),
          }),
          new Button({
            vIf: props.showClose,
            class: ns.e('headerbtn'),
            attrObj: {
              type: 'button',
              ariaLabel: t('el.dialog.close'),
            },
            events: {
              click: (evt, element) => {
                emit('close');
              },
            },
            slot: new TdIcon({
              class: ns.e('close'),
              slot: props.closeIcon
                ? new (props.closeIcon as unknown as typeof SvgSvg)()
                : new Close(),
            }),
          }),
        ],
      }),
      new Div({
        class: [ns.e('body'), props.bodyClass],
        attrObj: {
          id: bodyId,
        },
        slot: props.slot,
      }),
      new Footer({
        vIf: props.slots?.footer,
        class: [ns.e('footer'), props.footerClass],
        slot: props.slots?.footer,
      })
    );
  }
}
