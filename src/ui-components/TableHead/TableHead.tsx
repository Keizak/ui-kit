import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import {GridItemElementType} from "../../types/types";

export type Order = 'asc' | 'desc'

interface EnhancedTableProps<TEntity, AppStateType> {
    onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void
    order?: Order
    gridStructureData: GridItemElementType<TEntity, AppStateType>[]
}

//todo Проверить логику
export function EnhancedTableHead<TEntity, AppStateType>(props: EnhancedTableProps<TEntity, AppStateType>) {
    const {
        order,
        gridStructureData,
        onRequestSort = () => {},
    } = props
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {gridStructureData.map((d, index) => {
                    return (
                        <TableCell
                            key={index}
                            align={'center'}
                            /*sortDirection={orderBy === row.id ? order : false}*/
                        >
                            <TableSortLabel
                                /*active={orderBy === row.id}*/

                                direction={order}
                                onClick={createSortHandler(d.name !== null ? d.name : '')}
                            >
                                {d.title}
                            </TableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}