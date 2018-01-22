import React from 'react'
import TextInput from '../TextInput'

const yupToFormErrors = yupError => {
  if (!yupError.inner) return yupError

  const errors = {}
  for (const err of yupError.inner) {
    if (!errors[err.path]) {
      errors[err.path] = err.message
    }
  }
  return errors
}

export default (WrappedComponent, validationSchema) => {
  return class extends React.Component {
    componentWillMount() {
      this.reset()
    }

    reset() {
      this.setState({
        values: this.props.defaults || {}, // eslint-disable-line react/prop-types
        errors: {},
        touched: {},
      })
    }

    render() {
      const validateData = (data, onSuccess) => {
        if (validationSchema && validationSchema.validate) {
          validationSchema.validate(data, { abortEarly: false }).then(
            () => {
              this.setState({ errors: {} })
              return onSuccess && onSuccess(data)
            },
            errors => this.setState({ errors: yupToFormErrors(errors) }),
          )
        } else {
          return onSuccess && onSuccess(data)
        }
        return null
      }

      const newProps = {
        ...this.props,
        values: this.state.values,

        field: name => {
          return {
            name,
            value: this.state.values[name] || '',

            hasError: !!this.state.errors[name],

            error: this.state.errors[name],

            // handles character input or checkbox
            onChange: e => {
              let eventObject

              if (!e.target) {
                eventObject = {
                  value: e,
                }
              } else {
                eventObject = e.target
              }

              const { value } = eventObject
              const { values } = this.state

              this.setState(state => ({
                ...state,
                values: {
                  ...values,
                  [name]: value,
                },
              }))
              validateData({ ...this.state.values, [name]: value })
            },
          }
        },
      }

      return <WrappedComponent {...newProps} />
    }
  }
}
export { TextInput }
