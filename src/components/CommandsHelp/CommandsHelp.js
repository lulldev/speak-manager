import React from 'react'
import { Table } from 'reactstrap'

const CommandsHelp = () => {
 return (
   <div className="help-text text-left">
    <strong>Приветствие:</strong> <i>привет|здравствуйте|хай</i><br/>
    <strong>Прощание:</strong> <i>пока|до свидания</i><br/>
    <strong>Создать заказ:</strong> <i>(хочу+сделать+заказ)</i><br/>
    <strong>Заказ:</strong> <i>[имя_продукта]+[количество]+[ед.изм]</i><br/>
    <strong>Завершить заказ:</strong> <i>всё|(завершить+заказ)</i><br/>
    <strong>Сброс заказа:</strong> <i>передумал|отбой</i><br/>
   </div>
 )
}

export default CommandsHelp