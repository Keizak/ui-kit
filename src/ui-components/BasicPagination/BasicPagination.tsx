import React, {ChangeEvent, useState} from "react"
import {Pagination} from "@mui/material";
import {Block, Text} from "../../ui-styled-components/common";
import {BasicSelect} from "../BasicSelect/BasicSelect";

export type BasicPaginationPropsType = {
    currentPage?: number
    setCurrentPage?: (currentPage: number) => void

    countOnPages?: number
    optionsCountOnPage?: Array<string | number>
    onSelectCountOnPage?: (count: number | string) => void

    countPages?: number
    subTitlePagination?: string
}

/**
 * JSX Component( BasicPagination )
 * Компонента отображает пагинацию, натсраивается параметрами приходящими из вне
 * Принимает пропсы :
 * @param {type} prop
 * @param currentPage - Текущая страница ( по дефолту  = 1 ) ( Не обязательный )
 * @param setCurrentPage - функция выполняемая логику выбора другой страницы ( Не обязательный )
 *
 * @param countOnPages - Количество строк отображаемых на одной стронице ( по дефолту  = 10 ) ( Не обязательный )
 * @param subTitlePagination - Дополнительный текст правее пагинатора ( Не обязательный )
 * @param optionsCountOnPage - Массив вариантов,количества отображения строк на одной странице ( по дефолту [5,10,15,20] ( Не обязательный )
 *
 * @param countPages - Общие количество страниц ( по дефолту  = 0 )( Не обязательный )
 * @param onSelectCountOnPage - функция выполняемая при выборе ( Не обязательный )
 */
export const BasicPagination = React.memo(({
                                               currentPage = 1,
                                               countOnPages = 10,
                                               setCurrentPage,
                                               onSelectCountOnPage,
                                               countPages = 0,
                                               subTitlePagination,
                                               optionsCountOnPage = [5,10,15,20]
                                           }: BasicPaginationPropsType) => {

    //--------------------------------------------Инициализуем значения-------------------------------------------------

    const [defaultCurrentPage,setDefaultCurrentPage] = useState(currentPage)
    const [defaultCountOnPages,setDefaultCountOnPages] = useState<string | number>(countOnPages)

    //-------------------------------------------Дополнительные функции-------------------------------------------------

    /**
     * Функция проверяет, пришли ли обработчики выбора страницы из вне, если нет, использует стандартную логику
     * @param _event
     * @param page
     */
    const changePageHandler = (_event:ChangeEvent<unknown>,page:number) => {
        setCurrentPage && setCurrentPage(page)
        setDefaultCurrentPage(page)
    }

    /**
     * Функция проверяет, пришли ли обработчики выбора страницы из вне, если нет, использует стандартную логику
     * @param value
     */
    const changeCountOnPageHandler = (value:string | number) => {
        onSelectCountOnPage && onSelectCountOnPage(value)
        setDefaultCountOnPages(value)
    }

    //-------------------------------------------------JSX-----------------------------------------------------
    return (
        <Block name={"PaginationContainer"}>
            <Pagination
                count={Math.round(countPages)}
                variant="outlined"
                shape="rounded"
                color="primary"
                page={defaultCurrentPage}
                onChange={changePageHandler}
            />
            <Block name={"ShowCount"} margin={"0 15px 0 15px"}>
                <Text margin={"0 10px 0 0"}>Show</Text>
                <BasicSelect label={defaultCountOnPages.toString()}
                             options={optionsCountOnPage}
                             onSelect={changeCountOnPageHandler}
                             minWidth={39} height={24}
                            />
            </Block>
            <Block name={"subTitlePagination"}>{subTitlePagination && <span>{subTitlePagination}</span>}</Block>
        </Block>
    )
})