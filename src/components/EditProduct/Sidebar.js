import React from 'react'
import styled from 'styled-components'
import getProp from 'lodash/get'
import yup from 'yup'
import PropTypes from 'prop-types'
import Sidebar from '../Sidebar'
import TextInput from '../TextInput'
import Row from '../Row'
import Button from '../Button'

const Body = styled.div`
  flex-grow: 1;
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
  color: ${({ theme }) => theme.palette.base};
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

class ProductSidebar extends React.Component {
  componentWillReceiveProps(props) {
    ['title', 'description'].map(name => this.fieldUpdated(name, props.product[name]))
  }

  isFormValid = () => {
    return ['title', 'description']
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

  render() {
    const { isVisible, close } = this.props

    return (
      <Sidebar
        isOpen={isVisible}
        onBeforeClose={() => close()}
        content={() => [
          <Body>
            <Header>Edit product</Header>
            <Wrapper>
              <TextInput
                label="Product title"
                required
                error="4-8 characters, alphanumeric characters only"
                hasError={!this.state.title.isValid}
                value={this.state.title.value}
                onChange={e => this.fieldUpdated('title', e.target.value)}
              />
              <TextInput
                label="Description"
                value={this.state.description.value}
                onChange={e => this.fieldUpdated('description', e.target.value)}
              />
            </Wrapper>
          </Body>,
          <Footer>
            <Row>
              <Button onClick={close}>Cancel</Button>
            </Row>
            <Row justify="flex-end">
              <Button type={this.isFormValid() ? 'primary' : 'disabled'}>
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
    colorIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  close: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

export default ProductSidebar
