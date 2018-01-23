const colors = {
  base: '#3a3c40',
  foreground: 'white',
}
const palette = {
  base: colors.base,
  primary: colors.foreground,
  secondary: colors.base,
  alert: '#cd3939',
  border: '#dadde4',
  activeBg: '#f4f7fc',
}
const fontSizes = {
  heading: '30px',
  subHeader: '16px',
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
const button = {
  backgroundColor: '#1b7eac',
  color: colors.foreground,
  hover: '#27a3dd',
  active: '#5cbae5',
  border: 'solid 1px #156489',
}
export default {
  palette,
  whitespace,
  type,
  borders,
  button,
  fontSizes,
  fontFamilies,
  colors,
  transition,
  boxShadows,
}
