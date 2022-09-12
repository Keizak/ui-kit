import {CustomTableHead} from "./TableHead/CustomTableHead";
import {CustomTableBody} from "./TableBody/CustomTableBody";
import {Block} from "../../ui-styled-components/common";
import {BasicPagination, BasicPaginationPropsType} from "../BasicPagination/BasicPagination";
import {ReactNode} from "react";
import React from "react";

//-------------------------------------------------Types-----------------------------------------------------

export type CustomRowType = {
    value: ReactNode,
    justifyContent: string
    padding?:string
}

export type TableTitleType = {
    width: string,
    value: string,
    padding?:string
}
export type TableRowType = Record<string, ReactNode | CustomRowType>

export type BasicTablePropsType = {
    titles: TableTitleType[]
    rows: TableRowType[]
    minWidthTable : number | string
    paginationOptions?: BasicPaginationPropsType
}

//---------------------------------------------------------------------------------------------------------

/**
 * JSX Component( BasicTable )
 * Принимает пропсы :
 * @param {TableTitleType[]} props.titles - Заголовки таблицы ( обязательный )
 * @param {TableRowType[]} props.rows - Строки таблицы ( данные ) ( обязательный )
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы
 * @param {BasicPaginationPropsType} props.paginationOptions - Настройки пагинатора ( необязательный )
 */
export const BasicTable = (props: BasicTablePropsType) => {

    //-------------------------------------------------JSX-----------------------------------------------------

    return (
        <Block name={"Table with Paginator Container"} width={"100%"} margin={"24px 0 0 0"}
               display={"block"}>
            <Block name={"Table Container"} display={"block"} overflow={"auto"}>
                <CustomTableHead titles={props.titles} minWidth={props.minWidthTable}/>
                <CustomTableBody rows={props.rows} minWidth={props.minWidthTable}
                                 columnStyle={props.titles.map(title => ({width:title.width,padding:title.padding}))}/>
            </Block>

            <Block name={"Pagination"} width={"100%"} justifyContent={"flex-start"} margin={"38px 0 50px 0 "}>
                <BasicPagination {...props.paginationOptions} />
            </Block>
        </Block>
    )
}

