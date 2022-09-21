import {RowDataType} from "../types/types";

export function createRows<T, V, D>(item: T, edit: V, details: D): RowDataType<T, V, D> {
    return {item, edit, details}
}