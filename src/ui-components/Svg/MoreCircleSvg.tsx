import {StyledSvg} from "../../ui-styled-components/common";
import React from "react"

type MoreCircleSvgPropsType = {
    onClick: (e:React.MouseEvent<SVGSVGElement, MouseEvent>) => any
}
/**
 * SVG иконка, круг и 3 точки внутри
 * Принимает пропсы :
 * @param {(e:React.MouseEvent<SVGSVGElement, MouseEvent>) => any} props.onClick
 */
export const MoreCircleSvg = (props: MoreCircleSvgPropsType) => {
    return (
        <StyledSvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={(e) => props.onClick(e)}>
            <circle cx="12" cy="12" r="8.5" stroke="#0D0C0B"/>
            <circle cx="12.0005" cy="8.50024" r="0.875" fill="black"/>
            <circle cx="12.0005" cy="11.9998" r="0.875" fill="black"/>
            <circle cx="12.0005" cy="15.5" r="0.875" fill="black"/>
        </StyledSvg>

    )
}