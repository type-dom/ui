import { inject, TypeFragment, TypeNode, TypeProps } from '@type-dom/framework';
import { isEqual } from 'lodash-es';
import { isArray,  } from '@type-dom/utils';
import { TdOption } from '../../td-option/td-option.class';
import { selectKey } from '../token';
import { TdOptionProps } from '../../td-option/td-option.interface';

export class TdOptions extends TypeFragment {
  className: 'TdOptions';
  constructor(params: TypeProps) {
    super();
    this.className = 'TdOptions';
    this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const select = inject(selectKey)
    let cachedValueList: TdOptionProps[] = []

    this.slotChildren(props.slots?.default ?? props.slot)
    const children = this.children
    const valueList: TdOptionProps[] = []

    function filterOptions(children: TypeNode[]) {
      if (!isArray(children)) return
      children.forEach((item) => {
        const name = item.className

        if (name === 'TdOptionGroup') {
          filterOptions(item.children)
        } else if (name === 'TdOption') {
          valueList.push((item as TdOption).props)
        } else if (isArray(item.children)) {
          filterOptions(item.children)
        }
      })
    }

    if (children.length) {
      filterOptions(children[0]?.children)
    }

    if (!isEqual(valueList, cachedValueList)) {
      cachedValueList = valueList
      if (select) {
        select.states.optionValues = valueList
      }
    }

  }
}
