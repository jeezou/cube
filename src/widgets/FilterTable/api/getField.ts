import { $useFetch } from '~/composables/useMyFetch'
import { QueryBodyType } from "~/src/widgets/FilterTable/utils/types";
import { Dictionaries } from "~/src/features/loadDictionaries/utils/types";

export const getFieldRequest = async (
  field: string,
  query: QueryBodyType
): Promise<Dictionaries> => await $useFetch(
    `dictionary/filtered/single/${ field.toUpperCase() }`, {
      method: 'POST',
      body: query,
    })
