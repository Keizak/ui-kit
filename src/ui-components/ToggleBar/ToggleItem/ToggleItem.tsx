import {Block, Text} from "../../../ui-styled-components/common";
import {MouseEventHandler} from "react";
import {nanoid} from "nanoid";
import React from "react";

type ToggleItemPropsType = {
    title: string
    active: boolean
    onClick:  MouseEventHandler
}
/**
 * JSX Component( ToggleItem )
 * Надпись подчеркивающаяся снизу линией , цвета зависящего от текущего выбора
 * Та надпись на которую выпал выбор будет подсвечиваться голубоватым цветом.
 * Неактивная запись будет подсвечиваться серым
 * Принимает пропсы :
 * @param {string} props.title назвагие выбора
 * @param {boolean} props.active меняет цвета в зависимости от значения #366EFF - true , #A6A295 - false
 */
export const ToggleItem = (props: ToggleItemPropsType) => {
    const color = props.active ? "#366EFF" : "#A6A295"
    return (
        <Block name={"Toggle item"} width={"50%"} height={"60px"} borderBottom={`2px solid ${color}`} {...props} cursor={"pointer"} key={nanoid()}>
            <Text color={color}>{props.title}</Text>
        </Block>
    )
}