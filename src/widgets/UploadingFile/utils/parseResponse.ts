export const parseResponse = (res: string) : string | null => {
  if (typeof res === 'string') {
    const arr = res.split(';')
    const received = arr[0].split(' ')[1]
    const saved = arr[1].split(' ')[4]
    const existed = arr[2].split(' ')[2]

    return `</br>Загружено: ${received} записей.</br>
    Добавлено: ${saved} записей.</br>
    Было в базе: ${existed} записей.`
  } else return null
}
