import { Div, P, Span, TextNode, Transition } from '@type-dom/framework';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdAlert, ITdAlertConfig } from './td-alert.interface';
import {
  $alertCloseBtnStyle,
  $alertContentStyle,
  $alertDescriptionStyle,
  $alertIconStyle,
  $alertStyle,
  $alertTitleStyle,
  useStyle
} from './td-alert.style';

export class TdAlert extends UI<undefined> implements ITdAlert {
  className: 'TdAlert';
  override props: ITdAlertConfig;
  private transition: Transition;
  private alertDiv: Div;
  private alertContent: Div;
  private alertTitle?: Span;
  private alertDescription?: P;

  constructor(params: ITdAlertConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdAlert';
    useStyle(params);
    this.alertDiv = new Div({
      attrObj: {
        role: 'alert'
      },
      styleObj: $alertStyle,
    });
    if (params?.styleObj) {
      this.alertDiv.style.addObj(params.styleObj);
    }
    this.transition = new Transition({
      name: 'td-alert-fade',
      slot: this.alertDiv,
    });
    this.addChild(this.transition);
    const IconComponent = TypeComponentsMap[params?.type || 'info'];
    if (params?.showIcon && IconComponent) {
      this.alertDiv.addChild(new TdIcon({
        styleObj: $alertIconStyle,
        svgObj: new IconComponent()
      }));
    }
    this.alertContent = new Div({
      styleObj: $alertContentStyle
    });
    this.alertDiv.addChild(this.alertContent);
    this.addTitle(params);
    this.addDescription(params);
    this.addCloseElement(params);

    this.props = this.useParams(params);
  }
  addTitle(params?: ITdAlertConfig) {
    if (params?.title || params?.slots?.title) {
      this.alertTitle = new Span({
        styleObj: $alertTitleStyle
      });
      this.alertContent.addChild(this.alertTitle);
      if (params.slots?.title) {
        this.alertTitle.slotChild(params.slots.title);
      } else if (params.title) {
        this.alertTitle.addChild(new TextNode(params.title));
      }
    }
  }
  addDescription(params?: ITdAlertConfig) {
    if (params?.slot || params?.description) {
      this.alertDescription = new P({
        name: 'alert-description',
        styleObj: $alertDescriptionStyle
      });
      this.alertContent.addChild(this.alertDescription);
      if (params.slot) {
        this.alertDescription.slotChild(params.slot);
      } else if (params.description) {
        this.alertDescription.addChild(new TextNode(params.description));
      }
    }
  }
  addCloseElement(params?: ITdAlertConfig) {
    const closable = params?.closable ?? true;
    if (closable) {
      if (params?.closeText) {
        this.alertContent.addChild(new Div({
          text: params.closeText,
          styleObj: $alertCloseBtnStyle,
          events: {
            click: () => {
              if (params.emits?.close) {
                params.emits.close();
              }
              this.alertDiv.style.hide();
            }
          }
        }));
      } else {
        this.alertContent.addChild(new TdIcon({
          styleObj: $alertCloseBtnStyle,
          svgObj: new ElCloseSvg(),
          events: {
            click: () => {
              if (params?.emits?.close) {
                params.emits.close();
              }
              this.alertDiv.style.hide();
            }
          }
        }));
      }
    }
  }
}
