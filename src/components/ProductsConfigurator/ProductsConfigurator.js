import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormGroup,
} from 'reactstrap'

class ProductsConfigurator extends React.Component {
  static propsTypes = {
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.setProducts(JSON.parse(document.getElementsByClassName('products-json')[0].value))
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <textarea
              className="form-control products-json"
              defaultValue={JSON.stringify(this.props.products)}
              style={{height: '150px'}}
            ></textarea>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.handleClick}>Сохранить</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}


export default ProductsConfigurator
