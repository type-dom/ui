import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdMessage, TdSwitch } from '@type-dom/ui';

export class PreventSwitching extends TypeDiv {
  className = 'PreventSwitching';

 override  setup() {

    const value1 = signal(false)
    const value2 = signal(false)
    const loading1 = signal(false)
    const loading2 = signal(false)

    const beforeChange1 = () => {
      loading1.set(true)
      return new Promise((resolve) => {
        setTimeout(() => {
          loading1.set(false);
          TdMessage.success('Switch success')
          return resolve(true)
        }, 1000)
      }) as Promise<boolean>
    }

    const beforeChange2 = () => {
      loading2.set(true)
      return new Promise((_, reject) => {
        setTimeout(() => {
          loading2.set(false)
          TdMessage.error('Switch failed')
          return reject(new Error('Error'))
        }, 1000)
      }) as Promise<boolean>
    }

    this.addChildren(
      new TdSwitch({
        vModel: value1,
        beforeChange: beforeChange1,
        loading: loading1,
      }),
      new TdSwitch({
        name: 'switch-prevent-switching',
        vModel: value2,
        beforeChange: beforeChange2,
        loading: loading2,
        inlinePrompt: true
      })
    )

  }
}
