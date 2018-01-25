import React from 'react'
import styled from 'styled-components'
import getProp from 'lodash/get'
import yup from 'yup'
import PropTypes from 'prop-types'
import Sidebar from '../Sidebar'
import TextInput from '../TextInput'
import Row from '../Row'
import Button from '../Button'
import ColorSelector from './ColorSelector'

const Body = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.palette.base};
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.whitespace.base};
  font-size: 18px;
`

const schema = {
  title: yup
    .string()
    .matches(/^[a-z0-9]+$/i)
    .min(4)
    .max(8),
  description: yup.string(),
  colorIds: yup.array().min(1),
}

const fields = ['title', 'description', 'colorIds']

class ProductSidebar extends React.Component {
  state = {
    title: { isValid: false },
  }

  componentWillReceiveProps(props) {
    fields.map(name => this.fieldUpdated(name, props.product[name]))
  }

  isFormValid = () => {
    return fields
      .map(field => getProp(this.state, `${field}.isValid`))
      .every(item => !!item)
  }

  fieldUpdated = async (name, value) => {
    const isValid = await schema[name].isValid(value)

    this.setState({
      [name]: {
        value,
        isValid,
      },
    })
  }

  submit = () => {
    if (!this.isFormValid()) return null

    return this.props.save(
      fields.reduce((result, field) => {
        result[field] = this.state[field].value
        return result
      }, {}),
    )
  }

  render() {
    const { isVisible, close, isNew } = this.props

    return (
      <Sidebar
        isOpen={isVisible}
        onBeforeClose={() => close()}
        content={() => [
          <Body key="body">
            {!isNew && <Header>Edit product</Header>}
            {isNew && <Header>Add new product</Header>}
            <Wrapper>
              <TextInput
                label="Product title"
                required
                error="4-8 characters, alphanumeric only"
                hasError={!this.state.title.isValid}
                value={this.state.title.value}
                onChange={e => this.fieldUpdated('title', e.target.value)}
              />
              <TextInput
                label="Description"
                value={this.state.description.value}
                onChange={e => this.fieldUpdated('description', e.target.value)}
              />
              Product colors
              <ColorSelector
                values={this.state.colorIds.value}
                hasError={!this.state.colorIds.isValid}
                onChange={values => this.fieldUpdated('colorIds', values)}
              />
            </Wrapper>
          </Body>,
          <Footer key="footer">
            <Row>
              <Button onClick={close}>Cancel</Button>
            </Row>
            <Row justify="flex-end">
              <Button
                type={this.isFormValid() ? 'primary' : 'disabled'}
                onClick={this.submit}
              >
                Save
              </Button>
            </Row>
          </Footer>,
        ]}
      />
    )
  }
}

ProductSidebar.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    colorIds: PropTypes.array,
  }).isRequired,
  close: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
}

export default ProductSidebar
