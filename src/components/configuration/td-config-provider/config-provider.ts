// import { defineComponent, renderSlot, watch } from 'vue'
import { provideGlobalConfig } from './hooks/use-global-config';
import { TypeFragment } from '@type-dom/framework';
import { watch } from '@type-dom/signals';
import { MessageConfigContext } from '../../feedback/td-message/td-message.interface';
import { ConfigProviderProps, } from './config-provider-props';

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
    this.childNodes.forEach((child) => { // 全局配置
      child.assignProps({  config: config?.get() });
    })

  }
}

// export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider;
