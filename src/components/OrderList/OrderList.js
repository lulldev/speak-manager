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
    return (
      <div>
        <Table bordered={true} className="table-sm">
          <thead>
          <tr>
            <th>Товар</th>
            <th>Количество</th>
            <th>Цена (руб.)</th>
          </tr>
          </thead>
          <tbody>
            {
              this.props.order.map((order, i) => {
                return(
                  <tr key={i} className={this.props.isAccept ? 'table-success' : ''}>
                    <td>{order.name}</td>
                    <td>{`${order.count} ${order.measure}`}</td>
                    <td>{`${order.price}`}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}


export default OrderList