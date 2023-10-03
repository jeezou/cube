import { FieldType } from '../TableInput/utils/types'
import { Dictionaries } from './utils/types'
import { getDictionaries } from './api/getDictionaries'

export const dictionaries = ref<Dictionaries>()

export const loadDictionaries = async (inputFields: FieldType[]) => {
  try {
    dictionaries.value = await getDictionaries()
    addPivotDictionaries(dictionaries.value, inputFields)
  } catch (err) {
    console.log(err)
  }
}

export const addPivotDictionaries = (
  dictionaries: Dictionaries,
  inputFields: FieldType[]
) => {
  Object.keys(dictionaries).forEach((key) => {
    inputFields.forEach((field) => {
      const keyTitle = key
        .slice(0, key.toLowerCase().indexOf('columndictionary'))
        .toLowerCase()
      const fieldTitle = field.title.split('_').join('').toLowerCase()
      const correctingCharS =
        fieldTitle.lastIndexOf('s') === fieldTitle.length - 1
          ? fieldTitle.slice(0, fieldTitle.length - 1)
          : fieldTitle

      if (keyTitle === correctingCharS && dictionaries[key][0] !== null) {
        field.dictionary = dictionaries[key]
      }
    })
  })
}

export const addDictionaries = (
  key: string,
  dictionaries: Dictionaries,
  inputFields: FieldType[]
) => {
  inputFields.forEach((field) => {
    const keyTitle = key.toLowerCase()
    const fieldTitle = field.title.split('_').join('').toLowerCase()
    const correctingCharS =
      fieldTitle.lastIndexOf('s') === fieldTitle.length - 1
        ? fieldTitle.slice(0, fieldTitle.length - 1)
        : fieldTitle

    if (key === field.title) {
      field.dictionary = dictionaries
    }
  })
}
