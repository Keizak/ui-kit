import { Action } from 'redux';

import {
  IBaseEntity,
  IItemsResult,
  InferActionsTypes,
  ThunkType,
} from '../../types/types';
import {
  commonAsyncHandler,
  IActions,
} from '../common-async-handler/common-async-handler';

import { BaseAPI } from './base-api/BaseApi';

export type CrudStateType<TUpdate, TEntity extends TUpdate & IBaseEntity> = {
  items: Array<TEntity>;
  editingItem: (TUpdate & { id: string | number }) | null;
  pagesCount: number;
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
  sortBy: null | string;
  sortDirection: 'desc' | 'asc' | null;
  searchTerms: {
    propName: string;
    propValue: string;
    propType: 'number' | 'string' | 'boolean';
  }[];
};

enum EditingEntityStatuses {
  None,
  InProgress,
  Success,
  Error,
}

interface AppActions extends IActions {
  setEditingEntityStatus: (value: EditingEntityStatuses) => void;
}

type getAllDataType<TEntity> = {
  items: Array<TEntity>;
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
};

export const crudReducerCreator = <
  TUpdate,
  TEntity extends TUpdate & IBaseEntity,
  AppActionsType extends Action<any>,
  AppStateType,
  TGridSortFields extends string | null = null,
  TPatch = {}
>(
  api: BaseAPI<TUpdate, TEntity, TPatch>,
  reducerName: string,
  AppActions: AppActions,
  additionalReducer?: (
    state: CrudStateType<TUpdate, TEntity>,
    action: any
  ) => CrudStateType<TUpdate, TEntity>
) => {
  const initialState: CrudStateType<TUpdate, TEntity> = {
    items: [],
    editingItem: null,
    pagesCount: 0,
    currentPage: 1,
    pageSize: 50,
    totalItemsCount: 0,
    sortBy: null as TGridSortFields,
    sortDirection: null,
    searchTerms: [],
  };

  const actions = {
    createSuccess: (item: TEntity) =>
      ({
        type: `labs/crud/${reducerName}/create-success`,
        item: item,
      } as const),
    updateSuccess: (model: TEntity, id: string) =>
      ({
        type: `labs/crud/${reducerName}/update-success`,
        model,
        id,
      } as const),
    patchSuccess: (item: TEntity) =>
      ({ type: `labs/crud/${reducerName}/patch-success`, item } as const),
    deleteSuccess: (id: string) =>
      ({ type: `labs/crud/${reducerName}/delete-success`, id } as const),
    getByIdSuccess: (item: TUpdate | null) =>
      ({
        type: `labs/crud/${reducerName}/get-by-id-success`,
        item,
      } as const),
    getAllSuccess: (data: getAllDataType<TEntity>) =>
      ({
        type: `labs/crud/${reducerName}/get-all-success`,
        data,
      } as const),
    setSort: (sortBy: string) =>
      ({ type: `labs/crud/${reducerName}/set-sort`, sortBy } as const),
    setSortDirection: (sortDirection: 'asc' | 'desc') =>
      ({
        type: `labs/crud/${reducerName}/set-sort-direction`,
        sortDirection,
      } as const),
    setCurrentPage: (page: number) =>
      ({
        type: `labs/crud/${reducerName}/set-current-page`,
        page,
      } as const),
    setPageSize: (pageSize: number) =>
      ({
        type: `labs/crud/${reducerName}/set-page-size`,
        pageSize,
      } as const),
    setSearchTerms: (propName: any, propValue: string, searchType: string) =>
      ({
        type: `labs/crud/${reducerName}/set-search-terms`,
        propName,
        propValue,
        searchType,
      } as const),
    //fake: () => ({type: 'labs/crud/create'} as const),
  };

  type ActionsTypes = InferActionsTypes<typeof actions>;

  const reducer = (state = initialState, action: ActionsTypes) => {
    // @ts-ignore
    switch (action.type) {
      case `labs/crud/${reducerName}/create-success`:
        // @ts-ignore
        return { ...state, items: [action.item, ...state.items] };
      case `labs/crud/${reducerName}/update-success`:
        return {
          ...state,
          items: state.items.map((i) =>
            // @ts-ignore
            i.id !== action.id ? i : { ...i, ...action.model }
          ),
        };
      case `labs/crud/${reducerName}/patch-success`:
        return {
          ...state,
          items: state.items.map((i) =>
            // @ts-ignore
            i.id! == action.item.id ? i : action.item
          ),
        };
      case `labs/crud/${reducerName}/delete-success`:
        return {
          ...state,
          // @ts-ignore
          items: state.items.filter((i) => i.id !== action.id),
        };
      case `labs/crud/${reducerName}/get-by-id-success`:
        // @ts-ignore
        return { ...state, editingItem: action.item };
      case `labs/crud/${reducerName}/get-all-success`:
        return {
          ...state,
          // @ts-ignore
          items: action.data.items,
          // @ts-ignore
          pagesCount: action.data.pagesCount,
          // @ts-ignore
          totalItemsCount: action.data.totalCount,
        };
      case `labs/crud/${reducerName}/set-sort`:
        // @ts-ignore
        return { ...state, sortBy: action.sortBy };
      case `labs/crud/${reducerName}/set-sort-direction`:
        // @ts-ignore
        return { ...state, sortDirection: action.sortDirection };
      case `labs/crud/${reducerName}/set-current-page`:
        // @ts-ignore
        return { ...state, currentPage: action.page };
      case `labs/crud/${reducerName}/set-page-size`:
        // @ts-ignore
        return { ...state, pageSize: action.pageSize };
      case `labs/crud/${reducerName}/set-search-terms`:
        // eslint-disable-next-line no-case-declarations
        let terms = state.searchTerms.filter(
          // @ts-ignore
          (item) => item.propName !== action.propName
        );
        // eslint-disable-next-line no-case-declarations
        let newTerm = {
          // @ts-ignore
          propName: action.propName,
          // @ts-ignore
          propValue: action.propValue,
          // @ts-ignore
          propType: action.searchType,
        };

        // @ts-ignore
        if (
          (newTerm.propType === '1' && newTerm.propValue.length > 0) ||
          (newTerm.propType === '0' && newTerm.propValue !== null)
        ) {
          return { ...state, searchTerms: [...terms, newTerm] };
        }

        return { ...state, searchTerms: [...terms] };
      default:
        return additionalReducer ? additionalReducer(state, action) : state;
    }
  };

  const updateItemByPatch: any =
    (
      editingItemId: string,
      updateModel: TPatch
    ): ThunkType<any, AppStateType> =>
    async (dispatch) => {
      await commonAsyncHandler(
        async () => {
          const result = await api.path(editingItemId, updateModel);

          if (result.resultCode === 0) {
            dispatch(actions.patchSuccess(result.data));
            dispatch(
              AppActions.setEditingEntityStatus(EditingEntityStatuses.Success)
            );
          }

          return result;
        },
        dispatch,
        { ...AppActions }
      );
    };

  const updateItem: any =
    (
      editingItemId: string,
      updateModel: TUpdate
    ): ThunkType<ActionsTypes, AppStateType> =>
    async (dispatch) => {
      await commonAsyncHandler(
        async () => {
          const result = await api.update(editingItemId, updateModel);

          if (result.resultCode === 0) {
            dispatch(
              // @ts-ignore
              AppActions.setEditingEntityStatus(EditingEntityStatuses.Success)
            );
            let data = await api.getById(editingItemId);

            // @ts-ignore
            dispatch(actions.updateSuccess(data, editingItemId));

            return data;
          }

          return result;
        },
        dispatch,
        { ...AppActions }
      );
    };

  const deleteItem: any =
    (editingItemId: string): ThunkType<ActionsTypes, AppStateType> =>
    async (dispatch) => {
      await commonAsyncHandler(
        async () => {
          const result = await api.delete(editingItemId);

          if (result.resultCode === 0) {
            // @ts-ignore
            dispatch(actions.deleteSuccess(editingItemId));
            dispatch(
              // @ts-ignore
              AppActions.setEditingEntityStatus(EditingEntityStatuses.Success)
            );
          }

          return result;
        },
        dispatch,
        { ...AppActions }
      );
    };

  const getItemById: any =
    (userId: number): ((dispatch: any) => Promise<TEntity | null>) =>
    async (dispatch: any) => {
      return commonAsyncHandler(
        async () => {
          let data = await api.getById(userId);

          // @ts-ignore
          dispatch(actions.getByIdSuccess(data));

          return data;
        },
        dispatch,
        { ...AppActions }
      );
    };

  const getItems: any =
    (
      newPageSize?: number,
      extraQueryParams: { [key: string]: string } = {}
    ): ((
      dispatch: any,
      getState: () => AppStateType
    ) => Promise<IItemsResult<TEntity> | null>) =>
    async (dispatch: any, getState: () => AppStateType) => {
      return commonAsyncHandler(
        async () => {
          // @ts-ignore
          let sortBy = getState().labsReducers[reducerName].sortBy;
          let sortDirection =
            // @ts-ignore
            getState().labsReducers[reducerName].sortDirection;
          // @ts-ignore
          let pageSize = newPageSize
            ? newPageSize
            : // @ts-ignore
              getState().labsReducers[reducerName].pageSize;
          // @ts-ignore
          let currentPage = getState().labsReducers[reducerName].currentPage;
          // @ts-ignore
          let searchTerms = getState().labsReducers[reducerName].searchTerms;

          const data = await api.getAll(currentPage, pageSize, {
            sortBy: sortBy,
            sortDirection: sortDirection,
            searchTerms: searchTerms,
            ...extraQueryParams,
            //labStudentId: id ? id : null,//
            //searchTerms: [{propName: 'title', propValue: '6'}]
          });

          dispatch(actions.getAllSuccess(data));
          newPageSize && dispatch(actions.setPageSize(newPageSize));

          return data;
        },
        dispatch,
        { ...AppActions }
      );
    };

  const createItem: any =
    (): ThunkType<ActionsTypes, AppActionsType> => async (dispatch) => {
      await commonAsyncHandler(
        async () => {
          const result = await api.create();

          if (result.resultCode === 0) {
            // @ts-ignore
            dispatch(actions.createSuccess(result.data.item));
            dispatch(
              // @ts-ignore
              AppActions.setEditingEntityStatus(EditingEntityStatuses.Success)
            );
          }

          return result;
        },
        dispatch,
        { ...AppActions }
      );
    };

  return {
    reducer,
    thunks: {
      updateItem,
      updateItemByPatch,
      getItems,
      getItemById,
      createItem,
      deleteItem,
      cleanEditingItem: (item: TUpdate | null = null) => {
        return actions.getByIdSuccess(item);
      },
    },
    actions: {
      setSortBy: actions.setSort,
      setSortDirection: actions.setSortDirection,
      setCurrentPage: actions.setCurrentPage,
      setPageSize: actions.setPageSize,
      setSearchTerms: actions.setSearchTerms,
    },
  };
};
