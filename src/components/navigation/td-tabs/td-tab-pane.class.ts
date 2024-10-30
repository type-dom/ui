import { Div } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdTabPane, ITdTabPaneConfig } from './td-tab-pane.interface';

export class TdTabPane extends UI<undefined> implements ITdTabPane {
  className: 'TdTabPane';
  override props: ITdTabPaneConfig;
  isClosable?: boolean;
  active: boolean;
  shouldBeRender: boolean;
  private panel?: Div;
  private loaded: boolean;

  constructor(params: ITdTabPaneConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdTabPane';

    this.isClosable = params?.closable;
    this.active = false;
    this.loaded = false; // params?.loaded;
    this.shouldBeRender = !params?.lazy || this.loaded || this.active;
    if (this.shouldBeRender) {
      this.panel = new Div({
        className: 'tab-pane',
        attrObj: {
          role: 'tab-panel',
        },
        styleObj: {
          display: !this.active ? 'block' : 'none',
        },
      });
      if (params?.slot) {
        this.panel.slotChild(params.slot);
      }
      this.addChild(this.panel);
    }

    this.props = this.useParams(params);
  }
  setActive(active: boolean) {
    if (active) {
      this.panel?.style.show();
    } else {
      this.panel?.style.hide();
    }
  }
}
