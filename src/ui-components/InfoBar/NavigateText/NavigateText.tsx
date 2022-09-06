import {ArrowLeftSvg} from "../../Svg/ArrowLeftSvg";
import {Block} from "../../../ui-styled-components/common";
import {useNavigate} from "react-router-dom";
import {Path} from "history";
import React from "react";

type BackStepPropsType = {
    text:string
    navigatePath: string | Partial<Path> | undefined
}
/**
 *
 * JSX Component( NavigateText )
 * Называет и направляет по указанному в пропсах пути
 * Принимает пропсы :
 * @param {string} props.text текст описывающий путь
 * @param {string | Partial<Path>} props.navigatePath путь указывающий куда вывполнить навигейт
 */
export const NavigateText = (props: BackStepPropsType) => {
    const navigate = useNavigate()
    return (
        <Block name={"NavigateText"} width={"100%"} justifyContent={"flex-start"} alignItems={"center"}
               onClick={() => {
                      props.navigatePath ? navigate(props.navigatePath) : navigate(-1)
                  }} cursor={"pointer"} margin={"0 0 42px 0"}>
            <ArrowLeftSvg/>
            {props.text}
        </Block>
    )
}