import {nanoid} from "nanoid";
import React from "react";
import {Block} from "../../../ui-styled-components/common";
import {TableRowType} from "../BasicTable";


type columnStyle = {
    width?:string,
    padding?:string
}

type CustomTableBodyPropsType = {
    rows: TableRowType[]
    columnStyle: columnStyle[]
    minWidth: number | string
}
/**
 * JSX Component( CustomTableBody )
 * Принимает пропсы :
 * @param {TableRowType[]} props.rows - Строки таблицы ( данные ) ( обязательный )
 * @param { string[]} props.columnStyle - Стиль для столбца, стили наклываются по порядку начиная с 0
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы ( обязательный )
 */
export const CustomTableBody = (props: CustomTableBodyPropsType) => {
    return (
        <Block name={"Table body"} width={"100%"}
               display={"block"}
               minWidth={props.minWidth}
        >
            {props.rows.map((row) => (
                <Block
                    name={"Table row"}
                    key={nanoid()}
                    justifyContent={"flex-start"}
                    width={"100%"}
                    height={"46px"}
                    borderBottom={"1px solid #CFCFCF"}
                    flexWrap={"nowrap"}

                    // sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                    {Object.keys(row).map((key, index) => {
                        const currentRow = row[key] as any
                        return <Block name={"Row value"}
                                      key={nanoid()}
                                      margin={"0 0 0 24px"}
                                      padding={props.columnStyle[index].padding}
                                      justifyContent={currentRow.justifyContent ? currentRow.justifyContent : "flex-start"}
                                      width={props.columnStyle[index].width}>
                            {currentRow.value ? currentRow.value : currentRow}
                        </Block>
                    })}
                </Block>
            ))}
        </Block>
    )
}