import React, {ReactElement, useState, useEffect} from 'react';

import {Visibility} from '@mui/icons-material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {
    Button,
    Container,
    Fab,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material';
import {createStyles, makeStyles} from '@mui/styles';
import {Link, Outlet, useParams} from 'react-router-dom';

import {createRows} from '../../helpers/createRows';
import {useCustomSearchParams} from '../../helpers/useCustomSearchParams';
import {
    CrudStateType,
    FormElementType,
    GridItemElementType,
    IBaseEntity,
    RowDataType,
} from '../../types/types';
import CellValueWithControl from '../CellValueWithControl/CellValueWithControl';
import {PaginationWithSelectRows} from '../PaginationWithSelectedRows/PaginationWithSelectedRows';
import {EnhancedTableHead} from '../TableHead/TableHead';
import {EnhancedTableToolbar} from '../TableToolbar/TableToolbar';

export const useCRUDGridStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        paper: {
            /*width: '70%',*/
            marginTop: '20px',
            border: 'solid 1px black',
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
    })
);

export const withCRUDGrid = <TUpdate,
    TEntity extends TUpdate & IBaseEntity,
    CrudFlowsNamesTypes,
    RootRoutingKeys,
    AppStateType,
    CrudFlowsType>(
    entityName: CrudFlowsNamesTypes,
    rootRoutingKey: RootRoutingKeys,
    gridStructureData: GridItemElementType<TEntity, AppStateType>[],
    editFormData: FormElementType<TEntity>[] | null,
    title: string,
    crudFlows: CrudFlowsType,
    navigateUrl: (
        controllerName: RootRoutingKeys,
        actionName: string,
        id?: number
    ) => string,
    mdtp: { [key: string]: (...args: any[]) => any } = {},
    settings: {
        sortBy?: string | null;
        showCreate?: boolean | null;
        showRefresh?: boolean | null;
        showEdit?: boolean | null;
        showDetails?: boolean | null;
        componentDidMountLogic?: (dispatch: any) => void;
        idConverter?: (id: string) => any;
        getExtraGetAllParams?: (params: {
            queryParams: { [key: string]: string | undefined };
        }) => {
            [key: string]: string | undefined;
        };
    } | null = null,
    appHooks: {
        useAppDispatch: any;
        useHostLabsSelector: any;
        useHostSelector: any;
        useForm: any;
        useActions: any;
    },
    ...cellsRender: Array<(item: TEntity, props: any) => React.ReactNode>
) => {
    const CRUDGrid = (props: {
        renderContentAboveTable?: () => ReactElement;
    }) => {
        //-----------------------GET VALUES FROM HOOKS-------------------------
        let dispatch = appHooks.useAppDispatch();
        let searchTerms = appHooks.useHostLabsSelector((state: AppStateType) => {
            // @ts-ignore
            return state[entityName].searchTerms as CrudStateType<TUpdate, TEntity>;
        });
        // @ts-ignore
        let crudState = appHooks.useHostLabsSelector((state: AppStateType) => {
            // @ts-ignore
            return state[entityName] as unknown as CrudStateType<TUpdate, TEntity>;
        });
        // todo: remove full state selecting
        let state = appHooks.useHostLabsSelector((state: AppStateType) => state);
        const [order, setOrder] = useState<'asc' | 'desc'>('asc');
        const [orderBy, setOrderBy] = useState('');

        const classes = useCRUDGridStyles();
        let queryParams = {...useParams()};
        let {control, register} = appHooks.useForm();
        let [search, setSearch] = useCustomSearchParams<{
            page: string;
            rows: string;
        }>();


        // @ts-ignore
        let thunks = crudFlows[entityName].thunks;
        // @ts-ignore
        let actions = appHooks.useActions(crudFlows[entityName].actions);

        const page = crudState.currentPage;
        const pagesCount = crudState.pagesCount;
        const totalCount = crudState.totalItemsCount;
        const pageSize = crudState.pageSize;
        let items = crudState.items;

        //-----------------------Create ROWS-------------------------

        const rows: Array<RowDataType<TEntity, React.ReactNode, React.ReactNode>> =
            items.map((item: TEntity) =>
                createRows<TEntity, React.ReactNode, React.ReactNode>(
                    item,
                    <Tooltip title="Edit">
                        <Link
                            to={navigateUrl(
                                rootRoutingKey as RootRoutingKeys,
                                'edit',
                                item?.id
                            )}
                        >
                            <Fab size="small" color="primary">
                                <SettingsApplicationsIcon/>
                            </Fab>
                        </Link>
                    </Tooltip>,
                    <Tooltip title="Details">
                        <Link
                            to={navigateUrl(
                                rootRoutingKey as RootRoutingKeys,
                                'details',
                                item?.id
                            )}
                        >
                            <Fab
                                size="small"
                                color="primary"
                                onClick={() => console.log('item.id', item)}
                            >
                                <Visibility/>
                            </Fab>
                        </Link>
                    </Tooltip>
                )
            );

        //-----------------------CallBacks-------------------------

        const setPage = (page: number) => {
            setSearch({...search, page: page.toString()});
        };

        const setPageSize = (pazeSize: number) => {
            setSearch({...search, rows: pazeSize.toString()});
        };

        const handleRequestSort = (
            _event: React.MouseEvent<unknown>,
            property: string
        ) => {
            const isAsc = orderBy === property && order === 'asc';

            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
            dispatch(actions.setSortBy(property));
            dispatch(actions.setSortDirection(isAsc ? 'desc' : 'asc'));
        };

        const updateItemByPatch = (entityId: string, test: any) => {
            dispatch(thunks.updateItemByPatch(entityId, test));
        };

        //-----------------------Context-------------------------

        let context = {
            reducerName: entityName,
            formData: editFormData,
            formTitle: `${title}/edit`,
            cancelRedirectUrl: navigateUrl(
                rootRoutingKey as RootRoutingKeys,
                'index'
            ),
            idConverter: settings?.idConverter,
        };

        //-----------------------UseEffect-------------------------

        useEffect(() => {
            if (!search.page && page !== 1) {
                setSearch({page: page.toString()});
            }

            if (!search.rows && pageSize !== 50) {
                setSearch({rows: pageSize.toString()});
            }
        }, []);

        useEffect(() => {
            search.page && actions.setCurrentPage(+search.page);
        }, [search.page]);

        useEffect(() => {
            search.rows && actions.setPageSize(+search.rows);
        }, [search.rows]);

        useEffect(() => {
            let extraParams =
                settings?.getExtraGetAllParams &&
                settings?.getExtraGetAllParams({
                    queryParams: {...queryParams},
                });

            dispatch(thunks.getItems(null, extraParams));
        }, [orderBy, order, page, pageSize, searchTerms]);

        useEffect(() => {
            settings?.componentDidMountLogic &&
            settings?.componentDidMountLogic(dispatch);
        }, []);

        //-----------------------JSX-------------------------
        return (
            <Container fixed>
                <div className={classes.root}>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '15%'}}>
                            <Grid>
                                {props.renderContentAboveTable &&
                                    props.renderContentAboveTable()}
                            </Grid>
                            {settings?.showCreate ? (
                                <Grid>
                                    {entityName && (
                                        <Button
                                            onClick={() => dispatch(thunks.createItem())}
                                            variant="contained"
                                            color="primary"
                                            style={{marginTop: '10px'}}
                                        >
                                            Create
                                        </Button>
                                    )}
                                </Grid>
                            ) : null}
                            {settings?.showRefresh ? (
                                <Grid>
                                    <Button
                                        onClick={() => dispatch(thunks.getItems())}
                                        variant="contained"
                                        color="primary"
                                        style={{marginTop: '10px'}}
                                    >
                                        Refresh
                                    </Button>
                                </Grid>
                            ) : null}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                width: '85%',
                            }}
                        >
                            {gridStructureData.map((d, i) => {
                                let Component = d.editModeComponent && d.editModeComponent;

                                let registeredObj = {}

                                if (Component) {
                                    registeredObj = d.name && d.props!.register
                                        && register(d.name)
                                }

                                //const registeredObj = register(d.name !== null ? d.name : '');

                                return (
                                    <div key={i}>
                                        {Component ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '5px',
                                                }}
                                            >
                                                <form>
                                                    {Component ? (
                                                        <Component
                                                            name={d.name}
                                                            defaultValue={null}
                                                            control={control}
                                                            nullableTitle={d.title}
                                                            type={d.props?.type}
                                                            handleOnChange={(values: any) =>
                                                                actions.setSearchTerms(
                                                                    d.editModePropName
                                                                        ? d.editModePropName
                                                                        : d.name,
                                                                    values,
                                                                    d.editModePropType ? d.editModePropType : '1'
                                                                )
                                                            }
                                                            {...registeredObj}
                                                        />
                                                    ) : null}
                                                </form>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Grid>
                        <Paper className={classes.paper}>
                            <EnhancedTableToolbar numSelected={0} title={title}/>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table} aria-labelledby="tableTitle">
                                    <EnhancedTableHead<TEntity, AppStateType>
                                        gridStructureData={gridStructureData}
                                        order={order}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {rows.map((row, i) => {
                                            const isItemSelected = false;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={i}
                                                    selected={isItemSelected}
                                                >
                                                    {gridStructureData
                                                        .filter((d) => !d.onlyTitle)
                                                        .map((d, r) => {
                                                            let displayedValue: any = null;
                                                            let editValue = d.editModePropName
                                                                ? row.item[d.editModePropName]
                                                                : (row.item as any)[d.name];

                                                            if (d.name) {
                                                                let rawValue: any;

                                                                if (d.pathToProp) {
                                                                    rawValue = (row.item as any)[d.pathToProp][
                                                                        d.name
                                                                        ];
                                                                } else {
                                                                    rawValue = row.item[d.name];
                                                                }
                                                                if (d.parser) {
                                                                    displayedValue = d.parser(rawValue, state);
                                                                } else {
                                                                    displayedValue = rawValue;
                                                                }
                                                            }

                                                            return (
                                                                <TableCell
                                                                    key={r}
                                                                    align="center"
                                                                    component="th"
                                                                >
                                                                    <CellValueWithControl<any, any>
                                                                        itemId={row.item.id}
                                                                        name={d.name}
                                                                        editPropName={d.editModePropName}
                                                                        editPropValue={editValue}
                                                                        value={displayedValue}
                                                                        updateValue={updateItemByPatch}
                                                                        editCellFormData={d}
                                                                    />
                                                                </TableCell>
                                                            );
                                                        })}

                                                    {cellsRender.map((c, i) => (
                                                        <TableCell align="center" key={i}>
                                                            {c(row.item, {
                                                                ...mdtp,
                                                                dispatch,
                                                            })}
                                                        </TableCell>
                                                    ))}
                                                    {settings?.showEdit ? (
                                                        <TableCell
                                                            align="center">{row.edit}</TableCell>
                                                    ) : null}
                                                    {settings?.showDetails ? (
                                                        <TableCell
                                                            align="center">{row.details}</TableCell>
                                                    ) : null}
                                                </TableRow>
                                            );
                                        })}
                                        {
                                            <TableCell colSpan={20}>
                                                <PaginationWithSelectRows
                                                    currentPage={page}
                                                    pagesCount={pagesCount}
                                                    setCurrentPage={setPage}
                                                    totalCount={totalCount}
                                                    pageSize={pageSize}
                                                    setPageSize={setPageSize}
                                                />
                                            </TableCell>
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                </div>
                <Outlet context={context}/>
            </Container>
        );
    };

    return CRUDGrid;
};
