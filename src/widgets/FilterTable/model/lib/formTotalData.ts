import { FilterResponce } from '../../utils/types'

export default function formTotalData(filteredData: FilterResponce) {
  const {
    dictionaries,
    filtered_sales_reports,
    sales_item_summary,
    sales_value_summary,
    purse_value_summary,
  } = filteredData
  const content = filtered_sales_reports.content
  const totalResult = {
    elements: filtered_sales_reports.totalElements,
    pages: filtered_sales_reports.totalPages,
    salesItem: sales_item_summary,
    salesValue: sales_value_summary,
    purseValue: purse_value_summary,
  }
  return { dictionaries, content, totalResult }
}
