// import { defineComponent, renderSlot, watch } from 'vue'
import { provideGlobalConfig } from './hooks/use-global-config';
import {
  ConfigProviderProps,
  configProviderProps,
} from './config-provider-props';
import { MessageConfigContext } from '../../feedback/td-message/td-message.interface';
import { TypeFragment, TypeNode } from '@type-dom/framework';
import { watch } from '@type-dom/signals';

// import type { MessageConfigContext } from '@element-plus/components/message'

export const messageConfig: MessageConfigContext = {};

export class ConfigProvider extends TypeFragment {
  className: 'TdConfigProvider';
  override props: ConfigProviderProps;

  constructor(params: ConfigProviderProps) {
    super();
    this.className = 'TdConfigProvider';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const slots = this.props.slots;
    watch(
      () => props.message,
      (val) => {
        Object.assign(messageConfig, val ?? {});
      },
      { immediate: true, deep: true }
    );
    const config = provideGlobalConfig(props);
    // return () => renderSlot(slots, 'default', { config: config?.value })
    const slot = props.slot || slots?.default;
    // todo slot config
    this.slotChildren(slot);
  }
}

// export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider;
