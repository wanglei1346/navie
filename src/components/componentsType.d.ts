declare namespace Components {
  type IItemType = "input" | "select" | "daterange"
  type IFormOption = {
    label?: string
    key: string
    placeholder?: string
    type: IItemType
    options?: ISelectOption[]
  }
  type ISelectOption = {
    label: string
    value: string | number
  }
}
