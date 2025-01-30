import { TypeDivProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export type ProgressColor = { color: string; percentage: number };
export type ProgressFn = (percentage: number) => string;

export interface ProgressProps extends TypeDivProps {
  /**
   * @description type of progress bar
   */
  type?: 'line' | 'circle' | 'dashboard';
  /**
   * @description percentage, required
   */
  percentage?: MaybeRef<number>;
  /**
   * @description the current status of progress bar
   */
  status?: '' | 'success' | 'exception' | 'warning';
  /**
   * @description set indeterminate progress
   */
  indeterminate?: boolean;
  /**
   * @description control the animation duration of indeterminate progress or striped flow progress
   */
  duration?: number;
  /**
   * @description the width of progress bar
   */
  strokeWidth?: number;
  /**
   * @description butt/circle/dashboard type shape at the end path
   */
  strokeLinecap?: string;
  /**
   * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
   */
  textInside?: boolean;
  /**
   * @description the canvas width of circle progress bar
   */
  width?: number;
  /**
   * @description whether to show percentage
   */
  showText?: boolean;
  /**
   * @description background color of progress bar. Overrides `status` prop
   */
  color?: MaybeRef<string | ProgressColor[] | ProgressFn>;
  /**
   * @description stripe over the progress bar's color
   */
  striped?: boolean;
  /**
   * @description get the stripes to flow
   */
  stripedFlow?: boolean;
  /**
   * @description custom text format
   */
  format?: ProgressFn;
}
