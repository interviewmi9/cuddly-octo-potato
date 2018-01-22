import React from 'react'
import PropTypes from 'prop-types'

class Confirm extends React.Component {
  constructor(props) {
    super(props)

    const child = React.Children.only(this.props.children)
    const originalOnClick = child.props.onClick

    this.state = {
      clicked: false,
      originalOnClick,
      originalElement: React.cloneElement(child, { onClick: this.onClick }),
      confirmationElement: React.cloneElement(props.by, {
        onClick: this.onClick,
      }),
    }
  }

  onClick = () => {
    const { clicked } = this.state
    this.setState({ clicked: !clicked })

    if (clicked) return this.state.originalOnClick()
    return false
  }

  render() {
    if (this.state.clicked) return this.state.confirmationElement
    return this.state.originalElement
  }
}

Confirm.propTypes = {
  by: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
}

export default Confirm
