export const parseSortField = (fieldName: string) => {
  const splitedName = fieldName.split('_')
  let result = ''
  splitedName.forEach((partOfName, index) => {
    if (index === 0) return (result += partOfName)
    const firstLetter = partOfName[0].toUpperCase()
    result += firstLetter + partOfName.slice(1)
  })
  return result
}
