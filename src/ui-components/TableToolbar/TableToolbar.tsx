import {createStyles, makeStyles} from '@mui/styles'
import React from 'react'
import {Toolbar, Typography} from "@mui/material";

interface EnhancedTableToolbarProps {
    numSelected: number
    title: string
}

export const useToolbarStyles = makeStyles(() =>
    createStyles({
        spacer: {
            flex: '1 1 100%',
        },

        title: {
            flex: '0 0 auto',
        },
    })
)

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles()
    const { numSelected } = props

    return (
        <Toolbar>
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        {props.title}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
        </Toolbar>
    )
}