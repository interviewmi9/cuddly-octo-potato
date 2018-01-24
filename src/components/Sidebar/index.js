import React from 'react'
import noScroll from 'no-scroll'
import { Portal } from 'react-portal'
import PropTypes from 'prop-types'
import { Wrapper, SideBarWrapper, Footer, Body } from './styles'

class Sidebar extends React.Component {
  state = {
    isOpen: false,
    closing: false,
  }

  componentDidMount() {
    return this.props.isOpen ? this.open() : this.close()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      return nextProps.isOpen ? this.open() : this.close()
    }
    return true
  }

  wrapper = null

  open = () => {
    noScroll.on()
    this.setState({ isOpen: true, closing: false })
  }

  close = () => {
    const { onBeforeClose, onAfterClose } = this.props
    onBeforeClose()
    this.setState({ closing: true }, () => {
      setTimeout(() => {
        noScroll.off()
        this.setState({ isOpen: false, closing: false }, onAfterClose)
      }, 300)
    })
  }

  clickOut = e => {
    if (this.state.isOpen && e.target.className === this.wrapper.className) {
      this.close()
    }
  }

  render() {
    return (
      <div>
        {this.state.isOpen && (
          <Portal>
            <Wrapper
              isOpen={this.state.isOpen}
              closing={this.state.closing}
              innerRef={w => {
                this.wrapper = w
              }}
              onClick={this.clickOut}
            >
              <SideBarWrapper
                closing={this.state.closing}
              >
                {this.props.content && this.props.content(Body, Footer)}
              </SideBarWrapper>
            </Wrapper>
          </Portal>
        )}
      </div>
    )
  }
}

Sidebar.propTypes = {
  onBeforeClose: PropTypes.func,
  onAfterClose: PropTypes.func,
  isOpen: PropTypes.bool,
  content: PropTypes.func.isRequired,
}

Sidebar.defaultProps = {
  isOpen: false,
  onBeforeClose: () => {},
  onAfterClose: () => {},
}

export default Sidebar
