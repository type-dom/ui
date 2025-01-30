import { onMounted, provide, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { useLocale } from '../../../hooks/use-locale';
import { useNamespace } from '../../../hooks/use-namespace';
import { breadcrumbKey } from './constants';
import { ITdBreadcrumb, BreadcrumbProps } from './td-breadcrumb.interface';
import { breadcrumbProps } from './td-breadcrumb.const';
import './style/index';

export class TdBreadcrumb extends TypeDiv implements ITdBreadcrumb {
  className: 'TdBreadcrumb';
  override props: BreadcrumbProps;

  constructor(params: BreadcrumbProps = {}) {
    super();
    this.className = 'TdBreadcrumb';
    this.attr.addName('td-breadcrumb');
    this.assignProps(breadcrumbProps);
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdBreadcrumb setup . ');
    const { t } = useLocale();
    const props = this.props;

    const ns = useNamespace('breadcrumb');
    const breadcrumb = signal<HTMLDivElement>();

    provide(breadcrumbKey, props);

    onMounted(() => {
      const items = breadcrumb.get()!.querySelectorAll(`.${ns.e('item')}`);
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
    });

    this.assignProps({
      refDom: breadcrumb,
    });
    this.attr.addObj({
      class: ns.b(),
      ariaLabel: t('el.breadcrumb.label'),
      role: 'navigation',
    });
    this.slotChildren(props.slot || props.slots?.default);
  }
}
