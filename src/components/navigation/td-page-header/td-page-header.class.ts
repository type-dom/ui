import { Div, TypeDiv, useSlots } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useLocale } from '../../../hooks/use-locale';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdPageHeader, PageHeaderProps } from './td-page-header.interface';
import { pageHeaderProps } from './td-page-header.const';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdDivider } from '../../others/td-divider/td-divider.class';

export class TdPageHeader extends TypeDiv implements ITdPageHeader {
  className: 'PageHeader';
  override props: PageHeaderProps;

  constructor(param: PageHeaderProps) {
    super();
    this.className = 'PageHeader';

    this.assignProps(pageHeaderProps);
    this.props = this.useParams(param);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const slots = useSlots();

    const { t } = useLocale();
    const ns = useNamespace('page-header');
    const kls = computed(() => {
      return [
        ns.b(),
        {
          [ns.m('has-breadcrumb')]: !!slots?.breadcrumb,
          [ns.m('has-extra')]: !!slots?.extra,
          [ns.is('contentful')]: !!slots?.default,
        },
      ];
    });

    function handleClick() {
      emit('back');
    }

    this.attr.addClass(kls);
    this.addChildren(
      new Div({
        vIf: slots?.breadcrumb,
        class: ns.e('breadcrumb'),
        slot: slots?.breadcrumb,
      }),
      new Div({
        class: ns.e('header'),
        slot: [
          new Div({
            class: ns.e('left'),
            slot: [
              new Div({
                class: ns.e('back'),
                attrObj: {
                  role: 'button',
                  tabindex: '0',
                },
                events: {
                  click: handleClick,
                },
                slot: [
                  new Div({
                    vIf: props.icon || slots?.icon,
                    ariaLabel: props.title || t('el.pageHeader.title'),
                    class: ns.e('icon'),
                    slot:
                      slots?.icon ??
                      new TdIcon({
                        vIf: props.icon,
                        slot: new (props.icon as any)(),
                      }),
                  }),
                  new Div({
                    class: ns.e('title'),
                    slot:
                      slots?.title ?? (props.title || t('el.pageHeader.title')),
                  }),
                ],
              }),
              new TdDivider({
                direction: 'vertical',
              }),
              new Div({
                class: ns.e('content'),
                slot: slots?.content ?? props.content,
              }),
            ],
          }),
          new Div({
            vIf: slots?.extra,
            class: ns.e('extra'),
            slot: slots?.extra,
          }),
        ],
      }),
      new Div({
        vIf: props.slot || slots?.default,
        class: ns.e('main'),
        slot: props.slot ?? slots?.default,
      })
    );
  }
}
