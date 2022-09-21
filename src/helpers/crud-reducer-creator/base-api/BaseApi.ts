import {IActionResult, IBaseEntity, ICreateActionResult, IItemsResult} from "../../../types/types";
import {QueryStringUtils} from "../../query-sring-util/query-string-util";
import {AxiosInstance} from 'axios'

export interface IGetParams {
    [key: string]: string | number | boolean | null | undefined | SearchTermType[]
}

export interface IGetAllParams {
    [key: string]: string | number | boolean | null | undefined | SearchTermType[]
}

export type SearchTermType = {
    propName: string
    propValue: string
    propType: 'string' | 'number' | 'boolean'
}

const queryStringUtils = new QueryStringUtils()

export class BaseAPI<TUpdate,
    TEntity extends TUpdate & IBaseEntity,
    TPatch = Partial<TUpdate>> {
    protected defaultSortBy = null as string | null
    public CONSTS = {
        QUERY_PARAMS: {
            SORT_BY: 'sortBy',
        },
    }

    constructor(protected axios: AxiosInstance, protected baseUrl: string) {
    }

    async getAll(
        page: number = 1,
        pageSize: number = 10,
        queryParams: IGetAllParams | null = null,
        url: string | null = null
    ): Promise<IItemsResult<TEntity>> {
        if (!queryParams) queryParams = {} as any

        // @ts-ignore
        queryParams.page = page
        // @ts-ignore
        queryParams.pageSize = pageSize
        let response = await this.axios.get<IItemsResult<TEntity>>(
            (url || this.baseUrl) + this.getQueryStr(queryParams)
        )
        return response.data
    }

    async getById(id: number | string): Promise<TEntity> {
        let response = await this.axios.get<TEntity>(`${this.baseUrl}/${id}`)
        return response.data
    }

    async path(id: number | string, model: TPatch): Promise<IActionResult<TEntity>> {
        let response = await this.axios.patch<IActionResult<TEntity>>(`${this.baseUrl}/${id}`, model)
        return response.data
    }

    async create(): Promise<ICreateActionResult<TEntity>> {
        // server wait object, so we should send at least empty
        const data = {}
        let response = await this.axios.post<ICreateActionResult<TEntity>>(`${this.baseUrl}`, data)
        return response.data
    }

    async update(id: number | string | undefined, model: TUpdate): Promise<IActionResult<TEntity>> {
        let response = await this.axios.put<IActionResult<TEntity>>(`${this.baseUrl}/${id}`, model)
        return response.data
    }

    async delete(id: number | string): Promise<IActionResult<null>> {
        let response = await this.axios.delete<IActionResult<null>>(`${this.baseUrl}/${id}`)
        return response.data
    }

    private getQueryStr(params: IGetParams | null) {
        // todo: replace queryStringUtils import with DI
        return queryStringUtils.getQueryStr(params)
    }

    protected anyGet<T>(endpointUrl: string, params: any = {}, settings?: any) {
        if (endpointUrl[0] === '/') endpointUrl = endpointUrl.slice(1, endpointUrl.length)

        let defaultSettings = {params}
        if (settings) {
            defaultSettings = {
                ...defaultSettings,
                ...settings,
            }
        }
        return this.axios.get<T>(this.baseUrl + '/' + endpointUrl, defaultSettings).then((r: any) => r.data)
    }

    protected anyPatch(endpointUrl: string, body: any, settings?: any) {
        if (endpointUrl[0] === '/') endpointUrl = endpointUrl.slice(1, endpointUrl.length)
        return this.axios.patch(endpointUrl, body, settings)
    }

    private anyPostPut<T>(endpointUrl: string, body: any, type: 'post' | 'put', settings?: any) {
        if (endpointUrl[0] === '/') endpointUrl = endpointUrl.slice(1, endpointUrl.length)

        let defaultSettings = {
            ...settings,
        }

        return this.axios[type]<T>(this.baseUrl + '/' + endpointUrl, body, defaultSettings).then(
            (r: any) => r.data
        )
    }

    protected anyPost<T>(endpointUrl: string, body: any = {}, settings?: any) {
        return this.anyPostPut<T>(endpointUrl, body, 'post', settings)
    }

    protected anyPut<T>(endpointUrl: string, body: any = {}, settings?: any) {
        return this.anyPostPut<T>(endpointUrl, body, 'put', settings)
    }
}