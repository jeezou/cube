export const $useFetch = async<T>(request : string, opts? : any) :Promise<T> => {
  const runtimeConfig = useRuntimeConfig()

  const baseURL = (runtimeConfig.public.apiURL || runtimeConfig.apiURL) as
    | string
    | globalThis.Ref<string | undefined>
    | undefined

  // @ts-ignore
  const res = await useFetch<T>(request, {
    credentials: 'include',
    baseURL: baseURL,
    ...opts,
  })

  // @ts-ignore
  if (res.data?.value) return res.data.value
  // @ts-ignore
  else return res
}
