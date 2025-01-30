// import { buildProps, definePropType } from '@element-plus/utils'
// import { useEmptyValuesProps, useSizeProp } from '@element-plus/hooks'
//
// import type { ExtractPropTypes } from 'vue'
// import type { Language } from '@element-plus/locale'
// import type { ButtonConfigContext } from '@element-plus/components/button'
// import type { MessageConfigContext } from '@element-plus/components/message'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
import { TypeFragmentProps, TypeProps } from '@type-dom/framework';
import { Language } from '../../../locale';
import { ButtonConfigContext } from '../../basic/td-button/td-button.const';
import { UseEmptyValuesProps } from '../../../hooks/use-empty-values';
import { ComponentSize } from '../../../constants/size';
import { MessageConfigContext } from '../../feedback/td-message/td-message.interface';

export type ExperimentalFeatures = {
  // TO BE Defined
};

export interface ConfigProviderProps
  extends TypeFragmentProps,
    UseEmptyValuesProps {
  /**
   * @description Controlling if the users want a11y features
   */
  a11y?: boolean;
  /**
   * @description Locale Object
   */
  locale?: Language;
  /**
   * @description global component size
   */
  size?: ComponentSize;
  /**
   * @description button related configuration, [see the following table](#button-attributes)
   */
  button?: ButtonConfigContext;
  /**
   * @description features at experimental stage to be added, all features are default to be set to false                                                                                | ^[object]
   */
  experimentalFeatures?: ExperimentalFeatures;
  /**
   * @description Controls if we should handle keyboard navigation
   */
  keyboardNavigation?: boolean;
  /**
   * @description message related configuration, [see the following table](#message-attributes)
   */
  message?: MessageConfigContext;
  /**
   * @description global Initial zIndex
   */
  zIndex?: number;
  /**
   * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
   */
  namespace?: string;
  // ...useEmptyValuesProps,
}

export const configProviderProps: ConfigProviderProps = {
  a11y: true,
  keyboardNavigation: true,
  namespace: 'td',
  // ...useEmptyValuesProps,
};
