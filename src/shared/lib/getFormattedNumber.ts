export const getFormattedNumber = (value: number, isInteger?: boolean) => {
  if (value === null || value === undefined) return null
  let result: string | string[] = []
  let stringAfterComma = ''

  const roundedValue = isInteger ? value : value.toFixed(2)
  const arr = Array.from(roundedValue.toString())
  const commaIndex = arr.indexOf('.')

  if (commaIndex !== -1) {
    result = arr.slice(0, commaIndex)
    stringAfterComma = arr.slice(commaIndex).join('')
  } else {
    result = arr
  }

  const arrReverse = result.reverse()
  result = arrReverse
    .map((item, index) => (index !== 0 && index % 3 === 0 ? item + ' ' : item))
    .reverse()
    .join('')

  return result + stringAfterComma
}
