import { UI } from '../../../ui/ui.abstract';
import { ITdCheckbox, ITdCheckboxConfig } from './td-checkbox.interface';
import { Input, Span, StyleCursor } from '@type-dom/framework';
import { $bgColor, $borderRadius, $fontSizes, $fontWeightPrimary, $textColor, $zIndex } from '../../../styles/var';
import { $checkboxHeight } from './td-checkbox.style';

export class TdCheckbox extends UI implements ITdCheckbox {
  className: 'TdCheckbox';

  constructor(config?: ITdCheckboxConfig) {
    super({ tag: 'label' }); // label | span
    this.className = 'TdCheckbox';
    this.addAttrObj({
      name: 'td-checkbox'
    });
    this.addStyleObj({
      //   color: getCssVar('checkbox-text-color'),
      color: $textColor.regular,
      //   font-weight: getCssVar('checkbox-font-weight'),
      fontWeight: $fontWeightPrimary,
      // font-size: getCssVar('font-size', 'base'),
      fontSize: $fontSizes.base,
      position: 'relative',
      cursor: StyleCursor.pointer,
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      marginRight: '30px',
      // height: getCssVarWithDefault(
      //   'checkbox-height',
      //   map.get($checkbox-height, 'default')
      // );
      height: $checkboxHeight['default']
    });
    const inputSpan = new Span({
      attrObj: {
        name: 'td-checkbox-input-span'
      },
      styleObj: {
        whiteSpace: 'nowrap',
        cursor: StyleCursor.pointer,
        outline: 'none',
        display: 'inline - flex',
        position: 'relative'
      },
      childNodes: [
        new Input({
          name: 'original',
          attrObj: {
            type: 'checkbox'
          },
          styleObj: {
            opacity: 0,
            outline: 'none',
            position: 'absolute',
            margin: '0',
            width: 0,
            height: 0,
            zIndex: -1
          }
        }),
        new Span({
          name: 'inner',
          styleObj: {
            display: 'inline-block',
            position: 'relative',
            // border: getCssVar('checkbox-input-border'),
            // border: $checkboxInputBorder,
            // borderRadius: getCssVar('checkbox-border-radius'),
            borderRadius: $borderRadius['base'],
            boxSizing: 'border-box',
            // width: getCssVar('checkbox-input-width'),
            // width: $checkboxInputWidth,
            // height: getCssVar('checkbox-input-height'),
            height: $checkboxHeight['default'],
            // background-color: getCssVar('checkbox-bg-color'),
            backgroundColor: $bgColor.default,
            // z-index: getCssVar('index-normal'),
            zIndex: $zIndex.normal
            // transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
            // background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
            //   outline 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

          }
        })
      ]
    });
    const labelSpan = new Span({
      name: 'label',
      styleObj: {
        display: 'inline-block',
        paddingLeft: '8px',
        lineHeight: 1,
        // fontSize: getCssVar('checkbox-font-size'),
        fontSize: $fontSizes.base
      }
    });
    this.childNodes = [inputSpan, labelSpan];
    this.setConfig(config);
  }

  override setConfig(config?: ITdCheckboxConfig) {
    super.setConfig(config);
  }
}
