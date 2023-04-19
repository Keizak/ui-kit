import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Select } from '@mui/material';
import styled from 'styled-components';

// -------------------------------------------------Block------------------------------------------------------

export interface BlockProps {
  name: string;
  display?: string;
  width?: string | number;
  minWidth?: string | number;
  height?: string | number;
  margin?: string | number;
  padding?: string | number;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  background?: string;
  boxShadow?: string;
  borderRadius?: number | string;
  minHeight?: number | string;
  flexWrap?: string;
  cursor?: string;
  border?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
  borderRight?: string;
  overflow?: string;
  overflowY?: string;
  overflowX?: string;
  table?: boolean;
}

/**
 * Styled Component ( Block )
 * Тег Див , display : flex
 * Переиспользуемый див блок на флексах с гибкой настройкой
 * Принимает в себя пропсы обычного див элемента и свои кастомные:
 * @param {string} name - Имя компоненты, никак не влияет на отрисовку, для удобства навигации
 * @param {string} display - тип блока ( по дефолту  = flex) ( не обязательный )
 * @param {string | number} width - ширина ( необязательный )
 * @param {string | number} minWidth - минимальная ширина ( необязательный )
 * @param {string | number} height - высота  ( необязательный )
 * @param {string | number} margin - отступы снаружи ( необязательный )
 * @param {string | number} padding - отстпу внутри ( необязательный )
 * @param {string} justifyContent - расположденеи по главной оси ( необязательный ) default = center
 * @param {string} alignItems - расположденеи по второстепенной оси ( необязательный )  default = center
 * @param {string} flexDirection - Направлении оси ( необязательный )  default = row
 * @param {string} background - задний фон ( необязательный )
 * @param {string} boxShadow - boxShadow - тень ( необязательный )
 * @param {number | string} borderRadius - Закругление границ блока ( необязательный )
 * @param {string} flexWrap - переносы блоков при отстутсвии места ( необязательный )
 * @param {string} cursor - курсор при наведение на блок (необзательный)
 * @param {string} border - границы блока ( необязательный )
 * @param {string} borderBottom - отдельно нижняя граница ( необязательный )
 * @param {string} borderTop - отдельно верхняя граница ( необязательный )
 * @param {string} borderLeft - отдельно левая граница ( необязательный )
 * @param {string} borderRight - отдельно правая     граница ( необязательный )
 * @param {string} overflow - режим отображенияя информации не вмещающейся в границы блока( необязательный )
 * @param {string} overflow-y - режим отображенияя информации не вмещающейся в границы блока по оси Y( необязательный )
 * @param {string} overflow-x - режим отображенияя информации не вмещающейся в границы блока по оси X( необязательный )
 */
export const Block = styled.div`
  display: ${(props: BlockProps) => (props.display ? props.display : 'flex')};
  flex-direction: ${(props: BlockProps) =>
    props.flexDirection ? props.flexDirection : 'row'};
  justify-content: ${(props: BlockProps) =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${(props: BlockProps) =>
    props.alignItems ? props.alignItems : 'center'};
  width: ${(props: BlockProps) => (props.width ? props.width : 'auto')};
  min-width: ${(props: BlockProps) =>
    props.minWidth ? props.minWidth : 'auto'};
  height: ${(props: BlockProps) => (props.height ? props.height : '100%')};
  min-height: ${(props: BlockProps) =>
    props.minHeight ? props.minHeight : 'auto'};
  padding: ${(props: BlockProps) => (props.padding ? props.padding : 0)};
  margin: ${(props: BlockProps) => (props.margin ? props.margin : 0)};
  background: ${(props: BlockProps) =>
    props.background ? props.background : 'none'};
  box-shadow: ${(props: BlockProps) =>
    props.boxShadow ? props.boxShadow : 'none'};
  border: ${(props: BlockProps) => (props.border ? props.border : '0')};
  flex-wrap: ${(props: BlockProps) =>
    props.flexWrap ? props.flexWrap : 'wrap'};
  border-radius: ${(props: BlockProps) =>
    props.borderRadius ? props.borderRadius : '0'};
  cursor: ${(props: BlockProps) => (props.cursor ? props.cursor : 'auto')};
  border-bottom: ${(props: BlockProps) =>
    props.borderBottom ? props.borderBottom : 'auto'};
  border-top: ${(props: BlockProps) =>
    props.borderTop ? props.borderTop : 'auto'};
  border-left: ${(props: BlockProps) =>
    props.borderLeft ? props.borderLeft : 'auto'};
  border-right: ${(props: BlockProps) =>
    props.borderRight ? props.borderRight : 'auto'};
  overflow-y: ${(props: BlockProps) =>
    props.overflowY ? props.overflowY : ''};
  overflow-x: ${(props: BlockProps) =>
    props.overflowX ? props.overflowX : ''};
  overflow: ${(props: BlockProps) => (props.overflow ? props.overflow : '')};
  transition: border-bottom 0.1s ease-in-out;
  word-break: break-all;
`;
// -------------------------------------------------StyledSvg-----------------------------------------------------
export type StyledSvgProps = {
  margin?: string | number;
};

/**
 * Styled Component ( StyledSvg )
 * Тег Svg
 * Компонента обертка для свг иконок, с возможностью отступов
 * Принимает в себя пропсы :
 * @param {string | number} margin - отступы снаружи ( необязательный )
 */
export const StyledSvg = styled.svg`
  cursor: pointer;
  margin: ${(props: StyledSvgProps) =>
    props.margin ? props.margin : '0 12px 0 0'};
`;
// -------------------------------------------------StyledSelect-----------------------------------------------------

export type StyledSelectProps = {
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  border?: string | number;
};

/**
 * Styled Component ( StyledSelect )
 * Тег Select
 * Стилизованная комопнента селекта с возможность кастомизации
 * Принимает в себя пропсы :
 * @param {string | number} width - ширина ( необязательный )
 * @param {string | number} height - высота  ( необязательный )
 * @param {string | number} padding - отстпу внутри ( необязательный )
 * @param {string} border - границы блока ( необязательный )
 */
export const StyledSelect = styled(Select)`
  width: ${(props: StyledSelectProps) => (props.width ? props.width : '100%')};
  height: ${(props: StyledSelectProps) =>
    props.height ? props.height : '100%'};
  padding: ${(props: StyledSelectProps) => (props.padding ? props.padding : 0)};
  border: ${(props: StyledSelectProps) =>
    props.border ? props.border : 'none'};
`;

// -------------------------------------------------Text-----------------------------------------------------

export type TextProps = {
  fontSize?: string | number;
  fontWeight?: string | number;
  font?: string;
  opacityText?: number;
  margin?: string | number;
  color?: string;
  cursor?: string;
  borderBottom?: string;
};
/**
 * Styled Component ( Text )
 * Тег span
 * Отображает текст со стандартными значениями
 * шрифт - Roboto Regular, размер - 16 , толщина 400
 * Принимает в себя пропсы :
 * @param {string } font - Шрифт ( необязательный )
 * @param {string } color - цвет текста ( необязательный )
 * @param {string | number} fontSize - Размер шрифта ( необязательный )
 * @param {string | number} fontWeight - Толщина шрифта ( необязательный )
 * @param {string | number} margin - отступы снаружи ( необязательный )
 * @param {string } cursor - иконка при наведении на текст( необязательный )
 * @param {string } borderBottom - нижняя граница текста( необязательный )
 */
export const Text = styled.span`
  font-size: ${(props: TextProps) =>
    props.fontSize ? props.fontSize : '16px'};
  font-weight: ${(props: TextProps) =>
    props.fontWeight ? props.fontWeight : '400'};
  font-family: ${(props: TextProps) =>
      props.font ? props.font : 'Roboto Regular'},
    sans-serif;
  opacity: ${(props: TextProps) =>
    props.opacityText ? props.opacityText : '1'};
  margin: ${(props: TextProps) => (props.margin ? props.margin : '0')};
  color: ${(props: TextProps) => (props.color ? props.color : 'black')};
  cursor: ${(props: TextProps) => (props.cursor ? props.cursor : 'auto')};
  border-bottom: ${(props: TextProps) =>
    props.borderBottom ? props.borderBottom : '0'};
`;

// -------------------------------------------------StyledButton-----------------------------------------------------

export type StyledButtonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  border?: string;
  background?: string;
  margin?: string | number;
  boxShadow?: string;
  color?: string;
};
/**
 * Styled Component ( StyledButton )
 * Тег button
 * Компонента кнопка, стилизованная под общий дизайн
 * Принимает в себя пропсы :
 * @param {string | number} width - ширина ( необязательный )
 * @param {string | number} height - высота  ( необязательный )
 * @param {string} border - границы блока ( необязательный )
 * @param {number | string} borderRadius - Закругление границ блока ( необязательный )
 * @param {string | number} margin - отступы снаружи ( необязательный )
 * @param {string } background - задний фон ( необязательный )
 * @param {string } boxShadow - тень ( необязательный )
 * @param {string } color - цвет текста ( необязательный )
 */
export const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: StyledButtonProps) => (props.width ? props.width : 'auto')};
  height: ${(props: StyledButtonProps) =>
    props.height ? props.height : 'auto'};
  background: ${(props: StyledButtonProps) =>
    props.background ? props.background : '#FCFCFC'};
  box-shadow: ${(props: StyledButtonProps) =>
    props.boxShadow ? props.boxShadow : 'none'};
  border-radius: ${(props: StyledButtonProps) =>
    props.borderRadius ? props.borderRadius : '5px'};
  border: ${(props: StyledButtonProps) =>
    props.border ? props.border : 'none'};
  margin: ${(props: StyledButtonProps) => (props.margin ? props.margin : '0')};
  color: ${(props: StyledButtonProps) => (props.color ? props.color : 'black')};
`;

// -------------------------------------------------StyledKeyboardArrowDownIcon-----------------------------------------------------
/**
 * Styled Component ( StyledKeyboardArrowDownIcon )
 * Тег KeyboardArrowDownIcon ( Material UI Icon)
 * Стилизованная иконка в которой добавлены
 * стили для коректногоо отображения кастомной иконки в селекторе
 * Пропсы не принимает
 */
export const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)`
  position: absolute !important;
  right: 0 !important;
  pointer-events: none !important;
  margin-right: 10px;
`;
