export const sliderProps = {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  showInputControls: true,
  showTooltip: true,
  debounce: 300,
  placement: 'top',
  validateEvent: true,
  // ...useAriaProps(['ariaLabel']),
} as const;
