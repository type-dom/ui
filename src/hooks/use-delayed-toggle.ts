import { IUIConfig } from '../ui/ui.interface';

export interface IDelayedToggleConfig extends IUIConfig {
  /**
   * @description delay of appearance, in millisecond
   *     default: 0,
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond
   *     default: 200,
   */
  hideAfter?: number,
  /**
   * @description disappear automatically, in millisecond
   *     default: 0,
   */
  autoClose?: number,
}

export const useDelayedToggleProps = {
  showAfter: 0,
  hideAfter: 200,
  autoClose:  0,
};

// export type UseDelayedToggleProps = {
//   open: (event?: Event) => void
//   close: (event?: Event) => void
// } & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>
//
// export const useDelayedToggle = ({
//   showAfter,
//   hideAfter,
//   autoClose,
//   open,
//   close,
// }: UseDelayedToggleProps) => {
//   const { registerTimeout } = useTimeout()
//   const {
//     registerTimeout: registerTimeoutForAutoClose,
//     cancelTimeout: cancelTimeoutForAutoClose,
//   } = useTimeout()
//
//   const onOpen = (event?: Event) => {
//     registerTimeout(() => {
//       open(event)
//
//       const _autoClose = unref(autoClose)
//       if (isNumber(_autoClose) && _autoClose > 0) {
//         registerTimeoutForAutoClose(() => {
//           close(event)
//         }, _autoClose)
//       }
//     }, unref(showAfter))
//   }
//
//   const onClose = (event?: Event) => {
//     cancelTimeoutForAutoClose()
//
//     registerTimeout(() => {
//       close(event)
//     }, unref(hideAfter))
//   }
//
//   return {
//     onOpen,
//     onClose,
//   }
// }
