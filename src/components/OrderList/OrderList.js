import React from 'react'
import { Table } from 'reactstrap'

const OrderList = (props) => {
 if (!props.order) {
   return null
 }
 return (
   <div>
     <Table bordered={true}>
       <thead>
        <tr>
          <th>Товар</th>
          <th>Количество</th>
        </tr>
       </thead>
       <tbody>
         <tr>
           <td>Товар</td>
           <td>Количество</td>
         </tr>
       </tbody>
     </Table>
   </div>
 )
}

export default OrderList