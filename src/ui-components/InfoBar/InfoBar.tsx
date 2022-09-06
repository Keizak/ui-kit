import {Block} from "../../ui-styled-components/common";
import React , {ReactNode} from "react";
import {NavigateText} from "./NavigateText/NavigateText";
import {Path} from "history";
import {TitleAndButton} from "./TitleAndButton/TitleAndButton";

export type InfoBarPropsType = {
    title: string
    buttonText?: string
    navigateText?: string
    buttonOnClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
    subInfoBlock?: ReactNode
    navigatePath?: string | Partial<Path>
}
/**
 * JSX Component( InfoBar )
 * Показывает название текущего раздела с левого края , в противополжной стороне рисуется кнопка с действием
 * над именем разделом может распологаться переход на предыдущий раздел
 * под именем разделом можно отрисовать дополнитульную информацию
 * Принимает пропсы :
 * @param {string} props.title - Заголовок ( обязательный )
 * @param {string} props.buttonText - Текст на кнопке . Если текста нету , не будет и кнопки  ( необязательный )
 * @param {string} props.buttonOnClick - Функцця которая будет выполняться при нажатии на кнопку  ( необязательный )
 * @param {string} props.backStepText - Текст для навигации назад ( необязательный )
 * @param {ReactNode} props.infoBlock - Компонента для отображения дополнительной информации под тайтлом ( необязательный )
 * @param {string | Partial<Path>} props.navigatePath - Путь указывающий куда выполниться переход
 */
export const InfoBar = (props: InfoBarPropsType) => {

    //-----------------------------------------------JSX-----------------------------------------------

    return (
        <Block name={"Header"} width={"100%"} margin={"39px 0 0 0"}>
            {props.navigateText &&
                <NavigateText text={props.navigateText} navigatePath={props.navigatePath}/>}
            <TitleAndButton title={props.title} buttonText={props.buttonText}
                            onClick={(e) => props.buttonOnClick && props.buttonOnClick(e)}/>
            <Block name={"Sub Info"} width={"100%"} justifyContent={"flex-start"}>{props.subInfoBlock}</Block>

        </Block>
    )
}