import { revertUploadFile as postRevertUploadFile } from '../api/revertUploadFile'
import { XLSXFile } from '../types'
import { parseResponse } from './parseResponse'

export const revertUploadFile = async (
  file: XLSXFile,
  setIsLoading: (val: boolean) => void
): Promise<void> => {
  const { $notify } = useNuxtApp()

  try {
    $notify({
      title: 'Начинается загрузка файла',
    })
    setIsLoading(true)
    const result = await postRevertUploadFile(file)
    const parsedResult = parseResponse(result)
    $notify({
      title: 'Загрузка файла прошла успешно',
      text: parsedResult,
      type: 'success',
    })
  } catch (err) {
    $notify({
      title: 'Загрузка файла',
      text: 'Не удалось загрузить файл',
      type: 'error',
    })
  } finally {
    setIsLoading(false)
  }
}
