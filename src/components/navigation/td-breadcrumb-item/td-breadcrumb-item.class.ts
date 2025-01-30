import { inject, Router, Span, TypeSpan } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { breadcrumbKey } from '../td-breadcrumb/constants';
import {
  ITdBreadcrumbItem,
  BreadcrumbItemProps,
} from './td-breadcrumb-item.interface';
import './style/index';

export class TdBreadcrumbItem extends TypeSpan implements ITdBreadcrumbItem {
  className: 'TdBreadcrumbItem';
  override props: BreadcrumbItemProps;

  constructor(params: BreadcrumbItemProps = {}) {
    super();
    this.className = 'TdBreadcrumbItem';
    this.attr.addName('td-breadcrumb-item');
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    // const instance = getCurrentInstance()!
    const breadcrumbContext = inject(breadcrumbKey, undefined);
    const ns = useNamespace('breadcrumb');

    const router = props.router;

    const link = signal<HTMLSpanElement>();

    const onClick = () => {
      if (!props.toPath || !router) return;
      props.replace ? router.replace(props.toPath) : router.push(props.toPath);
    };

    this.addChildren(
      new Span({
        refDom: link,
        class: [ns.e('inner'), ns.is('link', !!props.toPath)],
        attrObj: {
          role: 'link',
        },
        events: {
          click: onClick,
        },
        slot: props.slot || props.slots?.default,
      }),
      new TdIcon({
        vIf: breadcrumbContext?.separatorIcon,
        class: ns.e('separator'),
        slot:
          breadcrumbContext.separatorIcon &&
          new (breadcrumbContext.separatorIcon as any)(),
      }),
      new Span({
        vIf: !breadcrumbContext?.separatorIcon,
        class: ns.e('separator'),
        attrObj: {
          role: 'presentation',
        },
        slot: breadcrumbContext?.separator,
      })
    );
  }
}
