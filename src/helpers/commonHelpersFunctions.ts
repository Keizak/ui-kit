import {TableTitleType} from "../ui-components/BasicTable/BasicTable";

//----------------------------------------createTitle---------------------------------------------

/**
 * Упрощает создание заголовка таблицы
 */
export const createTitle = (
    width: string,
    value: string
): TableTitleType => ({width, value})


export type StatusTeamPropsType =  "new" | "on pause" | "not active" | "active"

//----------------------------------------chooseColorFromStatus---------------------------------------------

export const chooseColorFromStatus = (status:StatusTeamPropsType) => {
    switch (status){
        case "active": return "#2068F8"
        case "new": return "#802DD4"
        case "on pause": return "#EFA640"
        case "not active": return "#737067"
        default: return "#2068F8"
    }
}