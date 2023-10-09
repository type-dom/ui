
export interface IOption {
  label: string,
  value: string | number | boolean,
  checked?: boolean, // radio checkbox
  selected?: boolean, // select
  options?: IOption[]
}

export interface IOptionConfig {
  name: string,
  // selectedOption: string | number | boolean,
  resultValue: string | number | boolean, // 不应该根据这个排队选中后的值，因为有可能是多选。
  options: IOption[]
}
