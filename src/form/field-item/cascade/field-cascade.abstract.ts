import { fromEvent } from 'rxjs';
import { StyleDisplay, Division, Label } from 'type-dom.ts';
import { TdButton } from '../../../basic/td-button/td-button.class';
import { FieldItem, itemContentStyle } from '../field-item.abstract';
import { TdSelect } from '../../../basic/td-select/td-select.class';
import { IOptionConfig } from '../field-item.interface';
/**
 * 两级联动，
 * 目前只有 字段名称属性项用到。 控件属性栏 control-field 字段属性栏 field-name
 */
export abstract class PropertyCascade extends FieldItem {
  childNodes: [Label, Division, TdButton];
  cascadeDiv: Division;
  firstStageSelectObj: TdSelect;
  secondStageSelectObj: TdSelect;
  private cascadeConfig?: IOptionConfig;

  abstract reset(value?: string): void;

  protected constructor(labelText = '二级级联') {
    super(labelText);
    this.addAttrName('cascade-property');
    this.cascadeDiv = new Division(this);
    this.cascadeDiv.addAttrName('cascade');
    this.cascadeDiv.addStyleObj({
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
      display: StyleDisplay.inlineBlock,
      outline: '0',
      // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
      width: 'calc(100% - 100px)',
    });

    // 单独的方法实现
    this.firstStageSelectObj = new TdSelect(this.cascadeDiv);
    this.firstStageSelectObj.addAttrName('first-stage-select');
    this.firstStageSelectObj.setStyleObj(Object.assign({}, itemContentStyle,
      {
        width: '100%',
        margin: '5px 0'
        // borderRadius: '4px 0 0 4px',
        // borderRight: 'none',
      }
    ));

    this.secondStageSelectObj = new TdSelect(this.cascadeDiv);
    this.secondStageSelectObj.addAttrName('second-stage-select');
    this.secondStageSelectObj.setStyleObj(Object.assign({}, itemContentStyle, {
      width: '100%',
    }));
    this.cascadeDiv.childNodes = [this.firstStageSelectObj, this.secondStageSelectObj];
    this.childNodes = [this.label, this.cascadeDiv, this.button];
    this.initEvents();
  }

  get fieldConfig(): IOptionConfig | undefined {
    const fieldConfigStr = this.configs?.fieldConfig;
    if (fieldConfigStr) {
      const configJson = JSON.parse(fieldConfigStr as string) as IOptionConfig;
      let optionConfig: IOptionConfig = {
        name: configJson.name,
        resultValue: configJson.resultValue,
        options: []
      };
      if (configJson.options[0].options === undefined) { // 如果只有一级，应该是老数据，要重新组装
        const values: string[] = [];
        configJson.options.forEach(opt => {
          if ((opt.value as string).indexOf('.') === -1) {
            // 错误的测试数据，业务数据不会有这个问题。
            throw Error('字段名称不是二级组装的 。 ');
          }
          const tableValue = (opt.value as string).split('.')[0];
          const tableLabel = (opt.label as string).split('.')[0];
          values.push(JSON.stringify({
            label: tableLabel,
            value: tableValue,
          }));
        });
        // todo 如何去重
        const firstStageValues = Array.from(new Set(values));
        firstStageValues.forEach((value) => {
          optionConfig.options.push(Object.assign({}, JSON.parse(value), { options: [] }));
        });
        configJson.options.forEach((opt2) => {
          optionConfig.options.forEach(opt1 => {
            if (String(opt1.value) === String((opt2.value as string).split('.')[0])) {
              opt1.options?.push(opt2);
            }
          });
        });
        // this.fieldConfig = optionConfig;
        return optionConfig;
      } else {
        return configJson;
      }
    }
    return undefined;
  }

  set fieldConfig(value: IOptionConfig | undefined) {
    // FormEditor.webDocument.setAttribute('field-config', JSON.stringify(value));
    if (this.configs === undefined) {
      if (value !== undefined) {
        this.configs = {
          fieldConfig: JSON.stringify(value),
        };
      }
    } else {
      if (value === undefined) {
        delete this.configs.fieldConfig;
      } else {
        this.configs.fieldConfig = JSON.stringify(value);
      }
    }
  }
  resetCascadeConfigResultValue(value: string | number | boolean): void {
    // AppRoot.selectedControl?.propObj.attrObj.optionConfig''
    // this.cascadeConfig = Object.assign(this.cascadeConfig, { resultValue: value });
    if (this.cascadeConfig) {
      this.cascadeConfig.resultValue = value;
    }
  }

  // todo vue项目中返回的是选中的项目。只有一层，没有两层。
  resetCascadeConfig(optionConfig: IOptionConfig): void {
    console.log('optionConfig is ', optionConfig);
    // this.cascadeDiv.clearChildNodes();
    // this.cascadeDiv.clearChildDom();
    this.cascadeConfig = optionConfig;
    if (optionConfig.resultValue === 0) { // 如果第1级还没有选择
      this.firstStageSelectObj.resetOptions(optionConfig.options, optionConfig.resultValue);
      //  todo 第2级，应该没有可选项。
      this.secondStageSelectObj.resetOptions([], 0);
      return;
    }
    //  todo config.options设置
    if (String(optionConfig.resultValue).indexOf('.') !== -1) {
      const firstStageValue = String(optionConfig.resultValue).split('.')[0];
      this.firstStageSelectObj.resetOptions(optionConfig.options, firstStageValue);

      // const firstStageValue = optionConfig.resultValue.split('.')[0];
      const selectedOption = optionConfig.options.find(opt => opt.value === firstStageValue);
      if (!(selectedOption?.options)) {
        // throw Error('选项有问题'); // 会阻塞修改单元格的控件类型
        this.secondStageSelectObj.resetOptions([], 0);
        console.error('选项有问题');
        return;
      }
      this.secondStageSelectObj.resetOptions(selectedOption.options, optionConfig.resultValue);
      // this.secondStageSelectObj.setSelectedValue(secondStageValue);
    }
  }

  initEvents(): void {
    this.events.push(
      fromEvent(this.firstStageSelectObj.dom, 'change').subscribe(() => {
        console.log('this.firstStageSelectObj.dom change . ');
        console.log('this.firstStageSelectObj.dom.value is ', this.firstStageSelectObj.dom.value);
        const selectedOption = this.cascadeConfig?.options?.find(opt => String(opt.value) === this.firstStageSelectObj.dom.value);
        if (!this.cascadeConfig) {
          throw Error('无法获取cascadeConfig');
        }
        // todo 没有改变值 ？？？？？
        if (selectedOption) {
          this.resetCascadeConfigResultValue(selectedOption.value);
        } else {
          this.secondStageSelectObj.resetOptions([{
            label: '请先选择上级',
            value: 0
          }], 0);
          return;
        }
        if (selectedOption && selectedOption.options) {
          console.log('this.cascadeConfig is ', this.cascadeConfig);
          console.log('selectedOption is ', selectedOption);
          this.secondStageSelectObj.resetOptions(selectedOption.options, 0);
        }
      }),
      fromEvent(this.secondStageSelectObj.dom, 'click').subscribe(() => {
        console.log('this.secondStageSelectObj.dom change . ');
        this.reset(this.secondStageSelectObj.dom.value);
      }),
      fromEvent(this.secondStageSelectObj.dom, 'change').subscribe(() => {
        console.log('this.secondStageSelectObj.dom change . ');
        this.reset(this.secondStageSelectObj.dom.value);
      })
    );
  }
}
