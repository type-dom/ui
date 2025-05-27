import {
  addUnit,
  isArray,
  isBoolean,
  isFunction,
  isString,
  clone, getProp, ensureArray
} from '@type-dom/utils';
import AsyncValidator, { RuleItem } from '@type-dom/async-validator';
// import { clone } from 'lodash-es';
import {
  Arrayable,
  arraySlot,
  defineExpose,
  Div,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  refDebounced,
  TransitionGroup,
  TypeDiv,
  useSlots,
  XElement,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { computed, signal, watch } from '@type-dom/signals';

import { useNamespace } from '../../../hooks/use-namespace';
import { useId } from '../../../hooks/use-id';
import { formContextKey, formItemContextKey } from '../td-form/td-form.const';
import { FormItemContext } from '../td-form/td-form.interface';
import { useFormSize } from '../td-form/hooks/use-form-common-props';
import { FormLabelWrap } from '../td-form/form-label-wrap/form-label-wrap.class';
import {
  ITdFormItem,
  FormItemProps,
  FormItemRule,
  FormItemValidateState,
  FormValidateFailure,
} from './td-form-item.interface';
import { formItemProps } from './td-form-item.const';
import './style/index';

export class TdFormItem extends TypeDiv implements ITdFormItem {
  className: 'TdFormItem';
  override props: FormItemProps;

  // new TdFormItem 是 发生在 TdForm slotChildren 之前的。
  constructor(params: FormItemProps = {}) {
    super();
    this.className = 'TdFormItem';
    this.attr.addName('td-form-item');
    this.assignProps(formItemProps);
    this.props = this.useParams(params);
  }

  // @logMethod
  override setup() {
    const props = this.props;
    const slots = useSlots();

    const formContext = inject(formContextKey, undefined);
    const parentFormItemContext = inject(formItemContextKey, undefined);

    const _size = useFormSize(undefined, { formItem: false });
    const ns = useNamespace('form-item');

    const labelId = useId().get();
    const inputIds = signal<string[]>([]);

    const validateState = signal<FormItemValidateState>('');
    const validateStateDebounced = refDebounced(validateState, 100);
    const validateMessage = signal('');
    const formItemRef = signal<HTMLDivElement>();
    // special inline value.
    let initialValue: any = undefined;
    let isResettingField = false;

    const labelPosition = computed(
      () => props.labelPosition || formContext?.labelPosition
    );

    const labelStyle = computed<IStyle>(() => {
      if (labelPosition.get() === 'top') {
        return {};
      }

      const labelWidth = addUnit(
        props.labelWidth || formContext?.labelWidth || ''
      );
      if (labelWidth) return { width: labelWidth };
      return {};
    });

    const contentStyle = computed<IStyle>(() => {
      if (labelPosition.get() === 'top' || formContext?.inline) {
        return {};
      }
      if (!props.label && !props.labelWidth && isNested) {
        return {};
      }
      const labelWidth = addUnit(
        props.labelWidth || formContext?.labelWidth || ''
      );
      if (!props.label && !slots?.label) {
        return { marginLeft: labelWidth };
      }
      return {};
    });

    const formItemClasses = computed(() => [
      ns.b(),
      ns.m(_size.get()),
      ns.is('error', validateState.get() === 'error'),
      ns.is('validating', validateState.get() === 'validating'),
      ns.is('success', validateState.get() === 'success'),
      ns.is('required', isRequired.get() || props.required),
      ns.is('no-asterisk', formContext?.hideRequiredAsterisk),
      formContext?.requireAsteriskPosition === 'right'
        ? 'asterisk-right'
        : 'asterisk-left',
      {
        [ns.m('feedback')]: formContext?.statusIcon,
        [ns.m(`label-${labelPosition.get()}`)]: labelPosition.get(),
      },
    ]);

    const _inlineMessage = computed(() =>
      isBoolean(props.inlineMessage)
        ? props.inlineMessage
        : formContext?.inlineMessage || false
    );

    const validateClasses = computed(() => [
      ns.e('error'),
      { [ns.em('error', 'inline')]: _inlineMessage.get() },
    ]);

    const propString = computed(() => {
      if (!props.prop) return '';
      return isString(props.prop) ? props.prop : props.prop.join('.');
    });

    const hasLabel = computed<boolean>(() => {
      return !!(props.label || slots?.label);
    });

    const labelFor = computed<string | undefined>(() => {
      return (
        props.for ||
        (inputIds.get().length === 1 ? inputIds.get()[0] : undefined)
      );
    });
    // console.error('labelFor', labelFor.get());

    const isGroup = computed<boolean>(() => {
      return !labelFor.get() && hasLabel.get();
    });

    const isNested = !!parentFormItemContext;

    const fieldValue = computed(() => {
      const model = formContext?.model;
      if (!model || !props.prop) {
        return;
      }
      return getProp(model, props.prop).value;
    });

    const normalizedRules = computed(() => {
      const { required } = props;

      const rules: FormItemRule[] = [];

      if (props.rules) {
        rules.push(...ensureArray(props.rules));
      }

      const formRules = formContext?.rules;
      if (formRules && props.prop) {
        const _rules = getProp<Arrayable<FormItemRule> | undefined>(
          formRules,
          props.prop
        ).value;
        if (_rules) {
          rules.push(...ensureArray(_rules));
        }
      }

      if (required !== undefined) {
        const requiredRules = rules
          .map((rule, i) => [rule, i] as const)
          .filter(([rule]) => Object.keys(rule).includes('required'));

        if (requiredRules.length > 0) {
          for (const [rule, i] of requiredRules) {
            if (rule.required === required) continue;
            rules[i] = { ...rule, required };
          }
        } else {
          rules.push({ required });
        }
      }

      return rules;
    });

    const validateEnabled = computed(() => normalizedRules.get().length > 0);

    const getFilteredRule = (trigger: string) => {
      const rules = normalizedRules.get();
      return (
        rules
          .filter((rule) => {
            if (!rule.trigger || !trigger) return true;
            if (isArray(rule.trigger)) {
              return rule.trigger.includes(trigger);
            } else {
              return rule.trigger === trigger;
            }
          })
          // exclude trigger
          // eslint-disable-preview-line @typescript-eslint/no-unused-vars
          .map(({ trigger, ...rule }): RuleItem => rule)
      );
    };

    const isRequired = computed(() =>
      normalizedRules.get().some((rule) => rule.required)
    );

    const shouldShowError = computed(
      () =>
        validateStateDebounced.get() === 'error' &&
        props.showMessage &&
        (formContext?.showMessage ?? true)
    );

    const currentLabel = computed(
      () => `${props.label || ''}${formContext?.labelSuffix || ''}`
    );

    const setValidationState = (state: FormItemValidateState) => {
      validateState.set(state);
    };

    const onValidationFailed = (error: FormValidateFailure) => {
      const { errors, fields } = error;
      if (!errors || !fields) {
        console.error(error);
      }

      setValidationState('error');
      validateMessage.set(
        errors ? errors?.[0]?.message ?? `${props.prop} is required` : ''
      );

      formContext?.emit('validate', props.prop!, false, validateMessage.get());
    };

    const onValidationSucceeded = () => {
      setValidationState('success');
      formContext?.emit('validate', props.prop!, true, '');
    };

    const doValidate = async (rules: RuleItem[]): Promise<true> => {
      const modelName = propString.get();
      const validator = new AsyncValidator({
        [modelName]: rules,
      });
      return validator
        .validate({ [modelName]: fieldValue.get() }, { firstFields: true })
        .then(() => {
          onValidationSucceeded();
          return true as const;
        })
        .catch((err: FormValidateFailure) => {
          onValidationFailed(err as FormValidateFailure);
          return Promise.reject(err);
        });
    };

    const validate: FormItemContext['validate'] = async (trigger, callback) => {
      // skip validation if its resetting
      if (isResettingField || !props.prop) {
        return false;
      }

      const hasCallback = isFunction(callback);
      if (!validateEnabled.get()) {
        callback?.(false);
        return false;
      }

      const rules = getFilteredRule(trigger);
      if (rules.length === 0) {
        callback?.(true);
        return true;
      }

      setValidationState('validating');

      return doValidate(rules)
        .then(() => {
          callback?.(true);
          return true as const;
        })
        .catch((err: FormValidateFailure) => {
          const { fields } = err;
          callback?.(false, fields);
          return hasCallback ? false : Promise.reject(fields);
        });
    };

    const clearValidate: FormItemContext['clearValidate'] = () => {
      setValidationState('');
      validateMessage.set('');
      isResettingField = false;
    };

    const resetField: FormItemContext['resetField'] = async () => {
      const model = formContext?.model;
      if (!model || !props.prop) return;

      const computedValue = getProp(model, props.prop);

      // prevent validation from being triggered
      isResettingField = true;

      computedValue.value = clone(initialValue);
      // computedValue.set(clone(initialValue)); // todo
      await nextTick();
      clearValidate();

      isResettingField = false;
    };

    const addInputId: FormItemContext['addInputId'] = (id: string) => {
      // console.error('addInputId . ');
      if (!inputIds.get().includes(id)) {
        inputIds.get().push(id);
      }
    };

    const removeInputId: FormItemContext['removeInputId'] = (id: string) => {
      inputIds.set(inputIds.get().filter((listId) => listId !== id));
    };

    watch(
      () => props.error,
      (val) => {
        validateMessage.set(val || '');
        setValidationState(val ? 'error' : '');
      },
      { immediate: true }
    );

    watch(
      () => props.validateStatus,
      (val) => setValidationState(val || '')
    );

    const context: FormItemContext = {
      // ...toRefs(props),
      ...props,
      $el: formItemRef,
      size: _size,
      validateState,
      labelId,
      inputIds,
      isGroup,
      hasLabel,
      fieldValue,
      addInputId,
      removeInputId,
      resetField,
      clearValidate,
      validate,
    };

    provide(formItemContextKey, context);

    onMounted(() => {
      if (props.prop) {
        formContext?.addField(context);
        initialValue = clone(fieldValue.get());
      }
    });

    onBeforeUnmount(() => {
      formContext?.removeField(context);
    });

    defineExpose({
      /**
       * @description Form item size.
       */
      size: _size,
      /**
       * @description Validation message.
       */
      validateMessage,
      /**
       * @description Validation state.
       */
      validateState,
      /**
       * @description Validate form item.
       */
      validate,
      /**
       * @description Remove validation status of the field.
       */
      clearValidate,
      /**
       * @description Reset current field and remove validation result.
       */
      resetField,
    });
    this.assignProps({
      refDom: formItemRef,
    });
    this.attr.addObj({
      class: formItemClasses,
      role: isGroup.get() ? 'group' : undefined,
      ariaLabeledby: isGroup.get() ? labelId : undefined,
    });
    this.addChild(
      new FormLabelWrap({
        isAutoWidth: labelStyle.get().width === 'auto',
        updateAll: formContext.labelWidth === 'auto',
        slot: new XElement({
          tag: labelFor.get() ? 'label' : 'div',
          vIf: hasLabel,
          attrObj: {
            id: labelId,
            for: labelFor.get(),
            class: ns.e('label'),
          },
          styleObj: labelStyle.get(),
          slot: slots?.label || currentLabel.get(),
        }),
      })
    );
    this.addChild(
      new Div({
        class: ns.e('content'),
        styleObj: contentStyle,
        slot: [
          ...arraySlot(props.slot || slots?.default),
          new TransitionGroup({
            // todo error
            //  <slot v-if="shouldShowError" name="error" :error="validateMessage">
            //           <div :class="validateClasses">
            //             {{ validateMessage }}
            //           </div>
            //         </slot>
            slot: shouldShowError.get()
              ? slots?.error ??
                new Div({
                  class: validateClasses,
                  slot: validateMessage,
                })
              : undefined,
            // init: (element) => {
            //   if (shouldShowError.get()) {
            //     if (slots?.error) {
            //       element.slotChildren(slots.error)
            //     } else {
            //       element.addChild(new Div({
            //         class: validateClasses,
            //         slot: validateMessage
            //       }))
            //     }
            //   }
            // }
          }),
        ],
      })
    );
  }
}
