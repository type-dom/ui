import { Div, Input, Label, nextTick, vHash } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { UI } from '../../../ui/ui.abstract';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { ITdSegmented, ITdSegmentedConfig, Option } from './td-segmented.interface';
import {
  $segmented,
  $segmentedGroupStyle, $segmentedItemInputStyle, $segmentedItemLabelStyle,
  $segmentedItemSelectedStyle,
  $segmentedItemStyle,
  $segmentedStyle, useStyle
} from './td-segmented.style';

export class TdSegmented extends UI implements ITdSegmented {
  className: 'TdSegmented';
  override props: ITdSegmentedConfig
  private group: Div;
  private disabled?: boolean;
  private state: {
    translateX: number;
    width: number;
    disabled: boolean | undefined;
    focusVisible: boolean;
    isInit: boolean
  };
  private selectedStyle?: IStyle;
  private selectedDiv: Div;
  override modelValue?: string | number | boolean | undefined;

  constructor(params: ITdSegmentedConfig = {}) {
    super();
    this.className = 'TdSegmented';
    useStyle(params);
    this.attr.addName('td-segmented');
    this.style.addObj($segmentedStyle);
    this.attr.addObj({
      role: 'radiogroup',
      ariaLabel: 'Segmented',
      ariaLabelledby: 'Segmented'
    });
    this.modelValue = params?.modelValue;
    this.disabled = params?.disabled; // todo form disabled
    this.group = new Div({
      styleObj: $segmentedGroupStyle
    });
    this.addChild(this.group);
    this.selectedDiv = new Div({
      styleObj: $segmentedItemSelectedStyle
    });
    this.state = {
      isInit: false,
      width: 0,
      translateX: 0,
      disabled: false,
      focusVisible: false
    };
    this.group.addChild(this.selectedDiv);
    // const props = this.props;
    const options = params?.options || [];
    const labels: Label[] = [];
    options.forEach((option, index) => {
      const label = new Label({
        name: 'td-segmented-item',
        styleObj: $segmentedItemStyle,
        childNodes: [
          new Input({
            name: params?.name || 'radio-' + vHash,
            attrObj: {
              type: 'radio',
              value: this.getValue(option),
              disabled: this.getDisabled(option),
              checked: this.getSelected(option)
            },
            styleObj: $segmentedItemInputStyle,
            events: {
              change: (evt, element) => {
                this.handleChange(option, element as Input);
              }
            }
          })
        ]
      });
      if (typeof option === 'object' && option.slot) {
        label.addChild(option.slot);
        option.slot.style.addObj({
          zIndex: 1 // todo ????? 否则显示不出来
        });
      } else {
        label.addChild(new Div({
          text: this.getLabel(option)?.toString(),
          name: 'item-label',
          styleObj: $segmentedItemLabelStyle
        }));
      }
      if (this.getDisabled(option)) {
        label.style.addObj({
          color: $segmented.itemDisabledColor,
          cursor: 'not-allowed'
        });
      }
      labels.push(label);
    });
    this.group.addChildren(...labels);

    this.props = this.useParams(params);
  }


  override mounted() {
    console.log('TdSegmented created');
    nextTick(() => {
      this.updateSelect();
    });
  }

  getValue(item: Option): string | number | boolean | undefined {
    return typeof item === 'object' ? item.value : item;
  }

  getLabel(item: Option): string | number | boolean | undefined {
    return typeof item === 'object' ? item.label : item;
  }

  getDisabled(item: Option): boolean | undefined {
    return !!(this.disabled || (typeof item === 'object' ? item.disabled : false));
  }

  getSelected(item: Option): boolean {
    return this.props.modelValue === this.getValue(item);
  }

  getOption(value?: string | number | boolean) {
    return this.props.options && this.props.options?.find((item) => this.getValue(item) === value);
  }

  updateSelect() {
    console.log('updateSelect');
    const labels: Label[] = this.group.findChildNodes('Label');
    labels.forEach((label, index) => {
      const input: Input | undefined = label.findChildNode('Input');
      if (input?.attr.get('value') === this.modelValue) {
        const rect = label.dom.getBoundingClientRect();
        label.style.setObj({
          color: $segmented.itemSelectedColor
        });
        this.state.isInit = true;
        this.state.width = rect.width;
        this.state.translateX = label.dom.offsetLeft;
        this.state.disabled = this.getDisabled(this.getOption(this.modelValue));
      } else {
        input?.attr.remove('checked');
        const options = this.props.options || [];
        if (options[index]) {
          const disabled = this.getDisabled(options[index]);
          if (disabled) {
            label.style.setObj({
              color: $segmented.itemDisabledColor,
            })
          } else {
            label.style.setObj({
              color: undefined // remove color
            });
          }
        }
      }
    });
    this.selectedStyle = {
      width: `${this.state.width}px`,
      transform: `translateX(${this.state.translateX}px)`,
      display: this.state.isInit ? 'block' : 'none'
    };
    this.selectedDiv.style.setObj(this.selectedStyle);
  }

  handleChange(item: Option, element: Input) {
    const value = this.getValue(item);
    this.emit(UPDATE_MODEL_EVENT, value);
    this.emit(CHANGE_EVENT, value);
    console.log('handleChange ', item);
    this.modelValue = this.getValue(item);
    element.attr.add('checked', true);
    this.updateSelect();
    // const value = this.getValue(item);
    // const update = this.props.emits?.[UPDATE_MODEL_EVENT];
    // if (update) {
    //   update(value);
    // }
    // const change = this.props.emits?.[CHANGE_EVENT];
    // if (change) {
    //   change(value);
    // }
  }
}
