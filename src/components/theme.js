const colors = {
  base: '#3a3c40',
  foreground: 'white',
}
const palette = {
  base: colors.base,
  primary: colors.foreground,
  secondary: colors.base,
  buttons: {
    primary: {
      backgroundColour: colors.blue,
      color: colors.white,
      hover: '#3c92ef',
      active: '#2e59a4',
      border: `solid 1px ${colors.blue}`,
    },
    secondary: {
      backgroundColour: colors.white,
      color: colors.steelBlue,
      hover: colors.shadeGray,
      active: colors.darkBlue,
      border: `solid 1px ${colors.shadeGray}`,
    },
  },
  black: colors.steelBlue,
  info: '#5ab0ed',
  alert: colors.red,
  warning: colors.orange,
  success: colors.green,
  border: colors.shadeGray,
  muted: colors.grayDefaultText,
}
const fontSizes = {
  heading: '30px',
  body: '14px',
  label: '12px',
}
const fontFamilies = {
  main: 'Sofia Pro',
}
const whitespace = {
  xxs: '5px',
  xs: '10px',
  small: '15px',
  base: '20px',
  medium: '36px',
  large: '40px',
  xlarge: '60px',
}
const type = {
  family: 'Sofia Pro',
  weight: 200,
  size: '16px',
  lineHeight: '16px',
  color: palette.base,
}
const borders = {
  radius: '4px',
  width: '2px',
}
const transition = {
  speed: '0.3s',
  ease: 'ease-in',
}
const boxShadows = {
  main: '-1px -1px 4px 0 rgba(192, 206, 225, 0.3)',
}

export default {
  palette,
  whitespace,
  type,
  borders,
  fontSizes,
  fontFamilies,
  colors,
  transition,
  boxShadows,
}
