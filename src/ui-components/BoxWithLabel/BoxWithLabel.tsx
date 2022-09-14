import {Text, Block} from "../../ui-styled-components/common";
import React, {PropsWithChildren} from "react";

interface BoxWithLabelPropsType extends PropsWithChildren {
    label: string
    margin?: string
}

/**
 * JSX Component( BoxWithLabel )
 * Принимает пропсы :
 * @param {string} props.label
 */
export const BoxWithLabel = (props: BoxWithLabelPropsType) => {

    //--------------------------------------------Инициализируем переменные---------------------------------------------

    const {margin = "0 14px 20px 0"} = props

    //--------------------------------------------------------JSX-------------------------------------------------------

    return (
        <Block
            name={'Select with label'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            margin={margin}
        >
            <Text opacityText={0.5} fontSize={'14px'} margin={'0 0 8px 0'}>
                {props.label}
            </Text>
            {props.children}
        </Block>
    )
}