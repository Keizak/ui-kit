import React from 'react'
import {makeStyles} from '@mui/styles'
import {BasicPagination} from "../BasicPagination/BasicPagination";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '& span': {
            marginTop: 0,
            marginLeft: '10px',
        },
    },
}))

type PaginationWithSelectRows = {
    setPageSize: (pageSize: number) => void
}

export interface IProps {
    currentPage: number
    pagesCount: number
    setCurrentPage: (currentPage: number) => void
    totalCount?: number
    pageSize?: number
}

export const PaginationWithSelectRows: React.FC<PaginationWithSelectRows & IProps> = ({
                                                                                          currentPage = 1,
                                                                                          pagesCount = 0,
                                                                                          setCurrentPage,
                                                                                          pageSize,
                                                                                          setPageSize,
                                                                                      }) => {
    const classes = useStyles()

    const rowsHandleChange = (value: any) => {
        setPageSize(value)
    }

    return (
        <div className={classes.root}>
            <BasicPagination
                currentPage={currentPage}
                optionsCountOnPage={['20', '50', '100']}
                countOnPages={pageSize}
                onSelectCountOnPage={rowsHandleChange}
                setCurrentPage={setCurrentPage}
                countPages={pagesCount}
            />
        </div>
    )
}