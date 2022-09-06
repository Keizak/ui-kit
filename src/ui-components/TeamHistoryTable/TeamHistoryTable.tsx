import {BasicTable} from "../BasicTable/BasicTable";
import {createTitle} from "../../helpers/commonHelpersFunctions";
import React from "react";

/**
 * JSX Component( TeamHistoryTable )
 * Рисует таблицу с историей команд
 */
export const TeamHistoryTable = () => {
    const titles = [
        createTitle("15%","Name team"),
        createTitle("15%","Level team"),
        createTitle("15%","Join date"),
        createTitle("15%","Out date"),
    ]

    const createRow = (
        name: string,
        levelTeam: number,
        joinDate: string,
        outDate: string,
    ) => ({name,levelTeam,joinDate,outDate})

    const rows = [
        createRow("Спелые персики",12,"12.12.2021","12.12.2021"),
        createRow("Спелые персики",12,"12.12.2021","12.12.2021"),
        createRow("Спелые персики",12,"12.12.2021","12.12.2021"),
        createRow("Спелые персики",12,"12.12.2021","12.12.2021"),
        createRow("Спелые персики",12,"12.12.2021","12.12.2021"),
        createRow("Спелые персики",12,"12.12.2021","12.12.2021")
    ]
    return (
       <BasicTable
           titles={titles}
           rows={rows}
           minWidthTable={"1500px"}
       />
    )
}