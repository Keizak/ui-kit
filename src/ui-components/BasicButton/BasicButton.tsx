import {StyledButton,Text} from "../../ui-styled-components/common";
import React, {ReactNode} from "react"

type BasicButtonPropsType = {
    mode: "normal" | "transparent" | "red" | "transparent-red"
    text: string | number | ReactNode
    icon?: ReactNode
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
    margin?: string | number
}
/**
 * JSX Component( BasicButton )
 * Принимает пропсы :
 * @param {"normal" | "transparent" | "red"} props.mode - мод кнопки, станжартный и прозрачный (Обязательный)
 * @param {string | number | ReactNode} props.text - текст отображаемый в кнопке (Обязательный)
 * @param {ReactNode} props.icon - Иконка перед текстом (Необязательный)
 * @param { (e?:Event) => void} props.onClick - Действие выполняемое после нажатия на кнопку,получает в себя ивент
 * @param {string | number} props.margin - Внешгие отступы, имеют дефолтные значения  margin:"10px 5px 10px 5px",
 * */
export const BasicButton = (props: BasicButtonPropsType) => {
    const normalStyleProps = {
        boxShadow:"0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
        width:"148px",
        height:"36px",
        margin: props.margin ? props.margin : "10px 5px 10px 5px",
        borderRadius:"2px",
    }
    switch (props.mode) {
        case "normal":
            return <StyledButton {...normalStyleProps} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick && props.onClick(e)}>
                {props.icon && props.icon}
                <Text font={"Roboto Medium"} cursor={"pointer"}>{props.text}</Text>
            </StyledButton>
        case "transparent" :
            return <StyledButton background={"none"} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick && props.onClick(e)}>
                {props.icon && props.icon}
                <Text font={"Roboto Medium"} fontWeight={700} cursor={"pointer"}>{props.text}</Text>
            </StyledButton>
        case "red" :
            return <StyledButton {...normalStyleProps} background={"#FF3636"}
                                 width={"178px"} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick && props.onClick(e)}>
                {props.icon && props.icon}
                <Text color={"white"} cursor={"pointer"}>{props.text}</Text>
            </StyledButton>
        case "transparent-red" :
            return <StyledButton {...normalStyleProps} background={"none"} border={"1px red solid"}
                                 width={"178px"} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick && props.onClick(e)}>
                {props.icon && props.icon}
                <Text color={"red"} cursor={"pointer"}>{props.text}</Text>
            </StyledButton>
        default:
            return <StyledButton onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick && props.onClick(e)}>
                {props.icon && props.icon}
                <Text font={"Roboto Medium"} cursor={"pointer"}>{props.text}</Text>
            </StyledButton>
    }

}

