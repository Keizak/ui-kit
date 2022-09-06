import React from "react";
import {StyledSvg} from"../../ui-styled-components/common";

/**
 * SVG иконка стрелка указывающая влево
 */
export const ArrowLeftSvg = () => {
    return (
        <StyledSvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12.5H6M6 12.5L10.6667 8M6 12.5L10.6667 17" stroke="black" strokeWidth="2"/>
        </StyledSvg>

    )
}