export const notifyStart = () => {
  const { $notify } = useNuxtApp()

  $notify({
    title: 'Начинается скачивание файла',
  })
}
export const notifySuccess = () => {
  const { $notify } = useNuxtApp()

  $notify({
    title: 'Файл успешно скачан',
    type: 'success',
  })
}
export const notifyLimit = () => {
  const { $notify } = useNuxtApp()

  $notify({
    title: 'Не удалось скачать данные',
    text: 'Превышен лимит 1 миллион записей. Примените фильтры!',
    type: 'error',
  })
}
export const notifyError = () => {
  const { $notify } = useNuxtApp()

  $notify({
    title: 'Не удалось скачать данные',
    text: 'Превышен лимит 1 миллион записей. Примените фильтры!',
    type: 'error',
  })
}
