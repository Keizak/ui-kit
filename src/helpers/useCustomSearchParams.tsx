import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'

type CustomSearchParamsType<T> = [
    T,
    (
        nextInit: URLSearchParamsInit,
        navigateOptions?:
            | {
            replace?: boolean | undefined
            state?: any
        }
            | undefined
    ) => void
]

export const useCustomSearchParams = <T extends unknown>() => {
    const [search, setSearch] = useSearchParams()

    const searchAsObject = Object.fromEntries(new URLSearchParams(search))

    return [searchAsObject, setSearch] as CustomSearchParamsType<T>
}