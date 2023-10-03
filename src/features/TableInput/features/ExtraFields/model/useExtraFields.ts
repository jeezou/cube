import { ExtraField } from '../libs/types'

export const isEmpty = ref(false)
export const isFilled = ref(false)

export const toggleEmpty = (fieldValue: string[]) => {
  fieldValue = [ExtraField.empty]
  isEmpty.value = !isEmpty.value
  isFilled.value = false
}

export const toggleFilled = (fieldValue: string[]) => {
  fieldValue = [ExtraField.filled]
  isFilled.value = !isFilled.value
  isEmpty.value = false
}
export const clearExtraFields = (fieldValue: string[]) => {
  fieldValue = []
  isEmpty.value = false
  isFilled.value = false
}
