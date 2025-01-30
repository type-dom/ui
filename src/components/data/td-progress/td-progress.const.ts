import { ProgressProps } from './td-progress.interface';

export const progressProps: ProgressProps = {
  type: 'line',
  percentage: 0,
  status: '',
  duration: 3,
  strokeWidth: 6,
  strokeLinecap: 'round',
  width: 126,
  showText: true,
  color: '',
  format: (percentage: number): string => `${percentage}%`,
};
