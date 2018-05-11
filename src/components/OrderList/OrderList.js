import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

class OrderList extends React.Component {
  static propsTypes = {
    order: PropTypes.array.isRequired,
    isAccept: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.order.length === 0) {
      return null
    }
    const order = this.props.order
    const totalPrice = order.reduce((a, b) => +a + +b.totalPrice, 0);
    return (
      <div>
        <Table bordered={true} size="sm">
          <thead>
          <tr>
            <th>Товар</th>
            <th>Количество</th>
            <th>Цена (руб.)</th>
            <th>Сумма</th>
          </tr>
          </thead>
          <tbody>
            {
              order.map((product, i) => {
                return(
                  <tr key={i} className={this.props.isAccept ? 'table-success' : ''}>
                    <td>{product.name}</td>
                    <td>{`${product.count} ${product.measure}`}</td>
                    <td>{`${product.price}`}</td>
                    <td>{`${product.totalPrice}`}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr className={this.props.isAccept ? 'table-success' : ''}>
              <th colSpan="3" className="text-right">Итого к оплате:</th>
              <th className="text-center">{ totalPrice }</th>
            </tr>
          </tfoot>
        </Table>
      </div>
    )
  }
}


export default OrderList