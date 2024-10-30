import { NOOP } from '@type-dom/utils'
import { UI } from '../../../../ui/ui.abstract';
import { formItemContextKey } from '../../../form/td-form/td-form.const';
import { TdFocusTrap } from '../../td-focus-trap/td-focus-trap.class';
import { POPPER_CONTENT_INJECTION_KEY } from '../td-popper.const';
import { popperContentProps } from './content.const';
import { ITdPopperContent, ITdPopperContentConfig } from './content.interface';
import { ITdFormItemConfig } from '../../../form/td-form-item/td-form-item.interface';

export class TdPopperContent extends UI implements ITdPopperContent {
  className: 'TdPopperContent';
  override props: ITdPopperContentConfig;
  private focusTrap: TdFocusTrap;

  constructor(params: ITdPopperContentConfig = {}) {
    super();
    this.className = 'TdPopperContent';
    this.attr.addName('td-popper-content');
    this.attr.addObj({
      tabindex: -1
    });
    this.focusTrap = new TdFocusTrap();
    this.addChild(this.focusTrap);
    if (params.contentStyle) { // todo
      this.style.addObj(params.contentStyle);
    }
    this.buildProps(popperContentProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const formItemContext = this.inject<ITdFormItemConfig>(formItemContextKey, undefined)
    const arrowOffset = 0;

    this.provide(POPPER_CONTENT_INJECTION_KEY, {
      // arrowStyle,
      // arrowRef,
      arrowOffset,
    })

    if (formItemContext) {
      // disallow auto-id from inside popper content
      this.provide(formItemContextKey, {
        ...formItemContext as any,
        addInputId: NOOP,
        removeInputId: NOOP,
      })
    }
  }
}
