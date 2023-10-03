import { uploadFile as uploadFileFetch } from '../api/uploadFile'
import { XLSXFile } from '../types'
import { parseResponse } from './parseResponse'

export const uploadFile = async (
  file: XLSXFile,
  setIsLoading: (val: boolean) => void
): Promise<void> => {
  const { $notify } = useNuxtApp()

  try {
    $notify({
      title: 'Начинается загрузка файла',
    })
    setIsLoading(true)
    const result = await uploadFileFetch(file)
    const parsedResult= parseResponse(result)
    $notify({
      title: 'Загрузка файла прошла успешно',
      text: parsedResult,
      type: 'success',
    })
    // @ts-ignore
    return result.operation_id
  } catch (err) {
    console.log(err)
    $notify({
      title: 'Загрузка файла',
      text: 'Не удалось загрузить файл',
      type: 'error',
    })
  } finally {
    setIsLoading(false)
  }
}
