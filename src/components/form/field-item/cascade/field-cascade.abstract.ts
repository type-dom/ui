import {
  Div,
  Label,
  Button,
  IOptionSet,
  IOptionSetting,
} from '@type-dom/framework';
import { FieldSelect } from '../../../form/field-select/field-select.class';
import { FieldItem } from '../field-item.abstract';
import { itemContentStyle } from '../field-item.style';

/**
 * 两级联动，
 * 目前只有 字段名称属性项用到。 控件属性栏 control-field 字段属性栏 field-name
 */
export abstract class PropertyCascade extends FieldItem {
  childNodes: [Label, Div, Button];
  cascadeDiv: Div;
  firstStageSelectObj: FieldSelect;
  secondStageSelectObj: FieldSelect;

  cascadeConfig?: IOptionSetting;
  override settings?: IOptionSetting;

  abstract reset(value?: string): void;

  protected constructor(labelText = '二级级联') {
    super(labelText);
    this.attr.addName('cascade-property');
    this.cascadeDiv = new Div();
    this.cascadeDiv.attr.addName('cascade');
    this.cascadeDiv.style.addObj({
      height: '100%',
      lineHeight: '32px',
      textAlign: 'center',
      backgroundColor: '#FFF',
      backgroundImage: 'none',
      borderRadius: '4px',
      // border: '1px solid #DCDFE6',
      // -webkit-box-sizing: border-box;
      boxSizing: 'border-box',
      color: '#606266',
      display: 'inlineBlock',
      outline: '0',
      // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
      width: 'calc(100% - 100px)',
    });

    // 单独的方法实现
    this.firstStageSelectObj = new FieldSelect();
    this.firstStageSelectObj.attr.addName('first-stage-select');
    this.firstStageSelectObj.style.setObj(
      Object.assign({}, itemContentStyle, {
        width: '100%',
        margin: '5px 0',
        // borderRadius: '4px 0 0 4px',
        // borderRight: 'none',
      })
    );

    this.secondStageSelectObj = new FieldSelect();
    this.secondStageSelectObj.attr.addName('second-stage-select');
    this.secondStageSelectObj.style.setObj(
      Object.assign({}, itemContentStyle, {
        width: '100%',
      })
    );
    this.cascadeDiv.childNodes = [
      this.firstStageSelectObj,
      this.secondStageSelectObj,
    ];
    this.childNodes = [this.label, this.cascadeDiv, this.button];
  }

  get fieldSetting(): IOptionSetting | undefined {
    const fieldSetting = this.props?.fieldSetting as IOptionSetting;
    if (fieldSetting) {
      const optionSetting: IOptionSetting = {
        name: fieldSetting.name,
        resultValue: fieldSetting.resultValue,
        options: [],
      };
      if (fieldSetting.options[0].options === undefined) {
        // 如果只有一级，应该是老数据，要重新组装
        const values: string[] = [];
        fieldSetting.options.forEach((opt) => {
          if ((opt.value as string).indexOf('.') === -1) {
            // 错误的测试数据，业务数据不会有这个问题。
            throw Error('字段名称不是二级组装的 。 ');
          }
          const tableValue = (opt.value as string).split('.')[0];
          const tableLabel = (opt.label as string).split('.')[0];
          values.push(
            JSON.stringify({
              label: tableLabel,
              value: tableValue,
            })
          );
        });
        // todo 如何去重
        const firstStageValues = Array.from(new Set(values));
        firstStageValues.forEach((value) => {
          optionSetting.options.push(
            Object.assign({}, JSON.parse(value), { options: [] })
          );
        });
        fieldSetting.options.forEach((opt2: IOptionSet) => {
          optionSetting.options.forEach((opt1) => {
            if (
              String(opt1.value) ===
              String((opt2.value as string).split('.')[0])
            ) {
              opt1.options?.push(opt2);
            }
          });
        });
        // this.fieldSetting = optionSetting;
        return optionSetting;
      } else {
        return fieldSetting;
      }
    }
    return undefined;
  }

  set fieldSetting(value: IOptionSetting | undefined) {
    // TypeFormDesigner.webDocument.setAttribute('field-config', JSON.stringify(value));
    if (this.settings === undefined) {
      if (value !== undefined) {
        this.setProp('fieldSetting', value);
      }
    } else {
      if (value === undefined) {
        delete this.settings.fieldSetting;
      } else {
        this.setProp('fieldSetting', value);
      }
    }
  }

  resetCascadeConfigResultValue(value: string | number | boolean): void {
    // this.cascadeConfig = Object.assign(this.cascadeConfig, { resultValue: value });
    if (this.cascadeConfig) {
      this.cascadeConfig.resultValue = value;
    }
  }

  // todo vue项目中返回的是选中的项目。只有一层，没有两层。
  resetCascadeConfig(optionSetting: IOptionSetting): void {
    console.log('optionSetting is ', optionSetting);
    // this.cascadeDiv.clearChildNodes();
    // this.cascadeDiv.clearChildDom();
    this.cascadeConfig = optionSetting;
    if (optionSetting.resultValue === 0) {
      // 如果第1级还没有选择
      this.firstStageSelectObj.resetOptions(
        optionSetting.options,
        optionSetting.resultValue
      );
      //  todo 第2级，应该没有可选项。
      this.secondStageSelectObj.resetOptions([], 0);
      return;
    }
    //  todo config.options设置
    if (String(optionSetting.resultValue).indexOf('.') !== -1) {
      const firstStageValue = String(optionSetting.resultValue).split('.')[0];
      this.firstStageSelectObj.resetOptions(
        optionSetting.options,
        firstStageValue
      );

      // const firstStageValue = optionSetting.resultValue.split('.')[0];
      const selectedOption = optionSetting.options.find(
        (opt) => opt.value === firstStageValue
      );
      if (!selectedOption?.options) {
        // throw Error('选项有问题'); // 会阻塞修改单元格的控件类型
        this.secondStageSelectObj.resetOptions([], 0);
        console.error('选项有问题');
        return;
      }
      this.secondStageSelectObj.resetOptions(
        selectedOption.options,
        optionSetting.resultValue
      );
      // this.secondStageSelectObj.setSelectedValue(secondStageValue);
    }
  }

  override setup(): void {
    this.firstStageSelectObj.addEvents({
      change: () => {
        console.log('this.firstStageSelectObj.dom change . ');
        console.log(
          'this.firstStageSelectObj.dom.value is ',
          this.firstStageSelectObj.dom?.value
        );
        const selectedOption = this.cascadeConfig?.options?.find(
          (opt) => String(opt.value) === this.firstStageSelectObj.dom?.value
        );
        if (!this.cascadeConfig) {
          throw Error('无法获取cascadeConfig');
        }
        // todo 没有改变值 ？？？？？
        if (selectedOption) {
          this.resetCascadeConfigResultValue(selectedOption.value);
        } else {
          this.secondStageSelectObj.resetOptions(
            [
              {
                label: '请先选择上级',
                value: 0,
              },
            ],
            0
          );
          return;
        }
        if (selectedOption && selectedOption.options) {
          console.log('this.cascadeConfig is ', this.cascadeConfig);
          console.log('selectedOption is ', selectedOption);
          this.secondStageSelectObj.resetOptions(selectedOption.options, 0);
        }
      },
    });
    this.secondStageSelectObj.addEvents({
      click: () => {
        console.log('this.secondStageSelectObj.dom change . ');
        this.reset(this.secondStageSelectObj.dom?.value);
      },
      change: () => {
        console.log('this.secondStageSelectObj.dom change . ');
        this.reset(this.secondStageSelectObj.dom?.value);
      },
    });
  }
}
