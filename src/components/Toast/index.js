import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { hide } from '../../redux/toast'

const Wrapper = styled.div`
  background-color: #606d88;
  color: #fff;
  padding: 19px 15px 15px 15px;
  width: 500px;
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -250px;
  text-align: center;
  bottom: -60px;
  transition: bottom ${props => props.theme.transition.speed} ${props => props.theme.transition.ease};
  z-index: 10;
  cursor: pointer;

  &.shown {
    bottom: 0;
  }
`

class Toast extends React.Component {
  state = {
    message: '',
    isShown: false,
    dismissTimeout: null,
  }

  componentWillReceiveProps({ message, dispatch, duration = 3000 }) {
    if (message) {
      const dismissTimeout = setTimeout(() => {
        dispatch(hide())
      }, duration)

      clearTimeout(this.state.dismissTimeout)
      this.show(message, dismissTimeout)
    } else {
      this.hide()
    }
  }

  hide = () => {
    this.setState({
      isShown: false,
      message: '',
      dismissTimeout: null,
    })
  }

  show = (message, dismissTimeout) => {
    this.setState({
      isShown: true,
      message,
      dismissTimeout,
    })
  }

  render() {
    return (
      <Wrapper className={this.state.isShown ? 'shown' : ''} onClick={this.hide}>
        {this.state.message}
      </Wrapper>
    )
  }
}

Toast.propTypes = {
  dispatch: PropTypes.func.isRequired,
  message: PropTypes.string,
}

Toast.defaultProps = {
  message: '',
}

export default connect((state) => {
  return state.toast || {}
})(Toast)
