import styled from 'styled-components'

const Wrapper = styled.div`
  @keyframes sidebarFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes sidebarFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  animation-name: ${props =>
    props.closing ? 'sidebarFadeOut' : 'sidebarFadeIn'};
  animation-duration: ${props => props.theme.transition.speed};
  animation-timing-function: ${props =>
    props.closing ? 'ease-in' : 'ease-out'};
  position: fixed;
  opacity: ${props => (props.closing ? 0 : 1)};
  height: 100%;
  width: 100%;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  top: 0;
  left: 0;
  background-color: ${props => props.theme.palette.transparentBackground};
  z-index: 1040;
`
const SideBarWrapper = styled.div`
  @keyframes sidebarSlideInRight {
    from {
      right: -${props => props.theme.sidebar.default};
    }
    to {
      right: 0;
    }
  }
  @keyframes sidebarSlideOutRight {
    from {
      right: 0;
    }
    to {
      right: -${props => props.theme.sidebar.default};
    }
  }
  animation-name: ${props =>
    props.closing ? 'sidebarSlideOutRight' : 'sidebarSlideInRight'};
  animation-duration: ${props => (props.closing ? '0.2s' : '0.3s')};
  animation-timing-function: ease-in-out;
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: ${props => props.theme.sidebar.default};
  padding: ${props => props.theme.whitespace.base};
  background-color: ${props => props.theme.palette.primary};
  bottom: 0;
  top: 0;
  right: ${props => (props.closing ? `-${props.theme.sidebar.default}` : 0)};
  z-index: 10;
  border-left: 1px solid ${props => props.theme.palette.border};
  box-shadow: ${props => props.theme.boxShadows.main};
  box-sizing: border-box;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
`
const Body = styled.div`
  margin-top: 20px;
  align-self: flex-start;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-y: auto;
`

export { Wrapper, SideBarWrapper, Footer, Body }
