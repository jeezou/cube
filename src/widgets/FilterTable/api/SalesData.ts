import { SalesData, QueryBodyType } from '../utils/types'
import { $useFetch } from '~/composables/useMyFetch'

export const getSalesData = async (
  query: QueryBodyType
): Promise<SalesData> => {
  const promises = []
  promises.push(async () => {
    let url = 'stat/sales/filter/sales-item'
    const { sales_item_summary }: any = await $useFetch(url, {
      method: 'POST',
      body: query,
    })
    return sales_item_summary
  })

  promises.push(async () => {
    let url = 'stat/sales/filter/sales-value'
    const { sales_value_summary }: any = await $useFetch(url, {
      method: 'POST',
      body: query,
    })
    return sales_value_summary
  })

  promises.push(async () => {
    let url = 'stat/sales/filter/purse-value'
    const { purse_value_summary }: any = await $useFetch(url, {
      method: 'POST',
      body: query,
    })
    return purse_value_summary
  })

  const res = await Promise.all(promises.map(async el => await el()))
  return {
    salesItem: res[0],
    salesValue: res[1],
    purseValue: res[2],
  }
}
