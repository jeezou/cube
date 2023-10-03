export const parseResponse = (res: string) => {
  const arr = res.split(';')
  const received = arr[0].split(' ')[1]
  const saved = arr[1].split(' ')[4]
  const existed = arr[2].split(' ')[2]

  return `</br>Получено: ${received} записей.</br>
Удалено из базы: ${saved} записей.</br>
Не обнаружено в базе: ${existed} записей.`
}
