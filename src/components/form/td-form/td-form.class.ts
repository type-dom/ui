import {
  Arrayable,
  defineExpose,
  // logMethod,
  provide,
  TypeForm,
} from '@type-dom/framework';
import { debugWarn, isFunction } from '@type-dom/utils';
import { signal, computed, unref, watch } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdFormItem } from '../td-form-item/td-form-item.class';
import { FormItemProp } from '../td-form-item/td-form-item.interface';
import { useFormSize } from './hooks/use-form-common-props';
import { filterFields, useFormLabelWidth } from './utils';
import {
  ITdForm,
  FormProps,
  FormItemContext,
  FormContext,
  FormValidateCallback,
  FormValidationResult,
  ValidateFieldsError,
} from './td-form.interface';
import { formContextKey, formEmits, formProps } from './td-form.const';
import './style/index';

/**
 * TdForm类继承自UI抽象类，实现ITdForm接口，用于创建和管理表单。
 * 提交表单时，应该要获取所有子元素 form-item 里的 如 TdInput 这些可输入的组件的值。
 * 表单提交地址也应该是可以配置的。
 */
export class TdForm extends TypeForm implements ITdForm {
  className: 'TdForm';
  override childNodes: TdFormItem[];
  override props: FormProps;

  /**
   * 构造函数，初始化表单配置。
   * @param params
   */
  constructor(params: FormProps = {}) {
    super();
    this.className = 'TdForm';
    this.attr.addName('td-form');
    this.childNodes = [];
    this.addEmits(formEmits);
    this.assignProps(formProps);
    this.props = this.useParams(params);
  }

  // @logMethod
  override setup() {
    const COMPONENT_NAME = 'TdForm';
    const props = this.props;
    const emit = this.emit;

    const formRef = signal<HTMLElement>()
    const fields: FormItemContext[] = [];

    const formSize = useFormSize();
    const ns = useNamespace('form');
    const formClasses = computed(() => {
      const { labelPosition, inline } = props;
      return [
        ns.b(),
        // todo: in v2.2.0, we can remove default
        // in fact, remove it doesn't affect the final style
        ns.m(formSize.get() || 'default'),
        {
          [ns.m(`label-${labelPosition}`)]: labelPosition,
          [ns.m('inline')]: inline,
        },
      ];
    });

    const getField: FormContext['getField'] = (prop) => {
      return fields.find((field) => field.prop === prop);
    };

    const addField: FormContext['addField'] = (field) => {
      fields.push(field);
    };

    const removeField: FormContext['removeField'] = (field) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    };

    const resetFields: FormContext['resetFields'] = (properties = []) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.');
        return;
      }
      filterFields(fields, properties).forEach((field) => field.resetField());
    };

    const clearValidate: FormContext['clearValidate'] = (props = []) => {
      filterFields(fields, props).forEach((field) => field.clearValidate());
    };

    const isValidatable = computed(() => {
      const hasModel = !!props.model;
      if (!hasModel) {
        debugWarn(COMPONENT_NAME, 'model is required for validate to work.');
      }
      return hasModel;
    });

    const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
      if (fields.length === 0) return [];

      const filteredFields = filterFields(fields, props);
      if (!filteredFields.length) {
        debugWarn(COMPONENT_NAME, 'please pass correct props!');
        return [];
      }
      return filteredFields;
    };

    const validate = async (
      callback?: FormValidateCallback
    ): FormValidationResult => validateField(undefined, callback);

    const doValidateField = async (
      props: Arrayable<FormItemProp> = []
    ): Promise<boolean> => {
      if (!isValidatable.get()) return false;

      const fields = obtainValidateFields(props);
      if (fields.length === 0) return true;

      let validationErrors: ValidateFieldsError = {};
      for (const field of fields) {
        try {
          await field.validate('');
        } catch (fields) {
          validationErrors = {
            ...validationErrors,
            ...(fields as ValidateFieldsError),
          };
        }
      }

      if (Object.keys(validationErrors).length === 0) return true;
      return Promise.reject(validationErrors);
    };

    const validateField: FormContext['validateField'] = async (
      modelProps = [],
      callback
    ) => {
      const shouldThrow = !isFunction(callback);
      try {
        const result = await doValidateField(modelProps);
        // When result is false meaning that the fields are not validatable
        if (result === true) {
          await callback?.(result);
        }
        return result;
      } catch (e) {
        if (e instanceof Error) throw e;

        const invalidFields = e as ValidateFieldsError;

        if (props.scrollToError) {
          // form-item may be dynamically rendered based on the judgment conditions, and the order in invalidFields is uncertain.
          // Therefore, the first form field with an error is determined by directly looking for the rendered element.
          if (formRef.get()) {
            const formItem = formRef.get()!.querySelector(
              `.${ns.b()}-item.is-error`
            )
            formItem?.scrollIntoView(props.scrollIntoViewOptions)
          }
        }
        await callback?.(false, invalidFields);
        return shouldThrow && Promise.reject(invalidFields);
      }
    };

    const scrollToField = (prop: FormItemProp) => {
      const field = filterFields(fields, prop)[0];
      if (field) {
        unref(field.$el)?.scrollIntoView(props.scrollIntoViewOptions);
      }
    };

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate().catch((err) => debugWarn(err));
        }
      },
      { deep: true }
    );

    provide(formContextKey, {
      // ...toRefs(props),
      ...props, // todo
      emit,

      resetFields,
      clearValidate,
      validateField,
      getField,
      addField,
      removeField,

      ...useFormLabelWidth(),
    });

    defineExpose({
      /**
       * @description Validate the whole form. Receives a callback or returns `Promise`.
       */
      validate,
      /**
       * @description Validate specified fields.
       */
      validateField,
      /**
       * @description Reset specified fields and remove validation result.
       */
      resetFields,
      /**
       * @description Clear validation message for specified fields.
       */
      clearValidate,
      /**
       * @description Scroll to the specified fields.
       */
      scrollToField,
      /**
       * @description All fields context.
       */
      fields,
    });

    this.assignProps({
      refDom: formRef,
    })
    this.attr.addClass(formClasses);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
