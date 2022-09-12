import React from "react";
import {StyledSvg} from "../../ui-styled-components/common";

type PlusInCircleSVGPropsType = {
    onClick?: (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => any
    width? : number
    height? : number
}
/**
 * JSX Component( PlusInCircleSVG )
 * Принимает пропсы :
 * @param {e:React.MouseEvent<SVGSVGElement, MouseEvent>) => any} props.onClick
 */
export const PlusInCircleSVG = (props: PlusInCircleSVGPropsType) => {
    const {width=50,height=50} = props
    return (
        <StyledSvg width={width} height={height}viewBox={`-5 -4 24 24`} fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick}>
            <path fillRule="evenodd" clipRule="evenodd" d="M0.833374 8.00004C0.833374 4.05723 4.05723 0.833374 8.00004 0.833374C11.9428 0.833374 15.1667 4.05723 15.1667 8.00004C15.1667 11.9428 11.9428 15.1667 8.00004 15.1667C4.05723 15.1667 0.833374 11.9428 0.833374 8.00004ZM8.00004 1.83337C4.60952 1.83337 1.83337 4.60952 1.83337 8.00004C1.83337 11.3906 4.60952 14.1667 8.00004 14.1667C11.3906 14.1667 14.1667 11.3906 14.1667 8.00004C14.1667 4.60952 11.3906 1.83337 8.00004 1.83337Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.83337 8C4.83337 7.72386 5.05723 7.5 5.33337 7.5H10.6667C10.9428 7.5 11.1667 7.72386 11.1667 8C11.1667 8.27614 10.9428 8.5 10.6667 8.5H5.33337C5.05723 8.5 4.83337 8.27614 4.83337 8Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 4.83337C8.27614 4.83337 8.5 5.05723 8.5 5.33337V10.6667C8.5 10.9428 8.27614 11.1667 8 11.1667C7.72386 11.1667 7.5 10.9428 7.5 10.6667V5.33337C7.5 5.05723 7.72386 4.83337 8 4.83337Z" fill="black"/>
        </StyledSvg>

    )
}