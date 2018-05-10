import React from 'react'
import {store} from '../store'
import PropTypes from "prop-types";
import { Row, Col, Jumbotron, Card, CardBody } from 'reactstrap';
import OrderList from '../components/OrderList/OrderList'
import ManagerChat from '../components/ManagerChat/ManagerChat'
import ProductsConfigurator from '../components/ProductsConfigurator/ProductsConfigurator'
import CommandsHelp from '../components/CommandsHelp/CommandsHelp'

const langNumbers = [
  'одну',
  'одна',
  'один',
  'две',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
  'десять',
]
const numbersLangEquals = [
  '1', '2', '3' , '4', '5', '6', '7', '8', '9', '10', ...langNumbers
]

class SpeakManager extends React.Component {

  static propsTypes = {
    blockButtonSpeak: PropTypes.func.isRequired,
    setStateButtonSpeak: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      clientMessage: '',
      responseMessage: '',
      isOrderStart: false,
      order: [],
      nextMessage: null,
      messages: [],
      isAccept: false,
      products: [
        { name: 'хлеб', measure: 'шт.', price: 10 },
        { name: 'молоко', measure: 'л.', price: 15 },
        { name: 'яблоки', measure: 'кг.', price: 5 },
      ],
    }

    store.subscribe(() => {
      this.setState({
        clientMessage: store.getState().buttonSpeak.voiceAnswer
      })
    })

    this.say = this.say.bind(this)
    this.replyHandler = this.replyHandler.bind(this)
    this.addNewMessage = this.addNewMessage.bind(this)
    this.generateOrder = this.generateOrder.bind(this)
    this.resetOrder = this.resetOrder.bind(this)
    this.isMsgIsLikeProduct = this.isMsgIsLikeProduct.bind(this)
    this.setProducts = this.setProducts.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.clientMessage !== prevState.clientMessage && this.state.clientMessage !== '') {
      this.replyHandler()
    }
  }

  componentDidMount() {
    this.say('Здравствуйте, чем я могу помочь?')
  }

  addNewMessage(who, msg) {
    const messages = this.state.messages
    messages.push({ who: who, text: msg})
    this.setState({
      messages: messages
    })
  }

  say(what) {
    this.setState({
      responseMessage: what,
    })
    this.addNewMessage('Менеджер', what)
    const synth = window.speechSynthesis;
    window.utterances = [];
    const utterThis = new SpeechSynthesisUtterance(what)
    window.utterances.push(utterThis);
    this.props.blockButtonSpeak(true)
    synth.speak(utterThis)
    utterThis.onend = function() {
      this.props.blockButtonSpeak(false)
    }.bind(this)
  }

  isMsgIsLikeProduct(msg) {
    const splitMsg = msg.split(' ')
    return splitMsg.length === 3
      && this.state.products.some((product) => product.name === splitMsg[0])
  }

  getMeasureByWord(word) {
    if (word.includes('штук')) {
      return 'шт.'
    }
    else if (word === 'л' || word.includes('литр')) {
      return 'л.'
    }
    else if (word === 'кг' || word.includes('килограмм')) {
      return 'кг.'
    }
    return null;
  }

  formatCount(count) {
    let resultCount = count
    switch(count) {
      case 'одну':
        resultCount = 1;
        break;
      case 'одна':
        resultCount = 1;
        break;
      case 'один':
        resultCount = 1;
        break;
      case 'два':
        resultCount = 2;
        break;
      case 'две':
        resultCount = 2;
        break;
      case 'три':
        resultCount = 3;
        break;
      case 'четыре':
        resultCount = 4;
        break;
      case 'пять':
        resultCount = 5;
        break;
      case 'шесть':
        resultCount = 6;
        break;
      case 'семь':
        resultCount = 7;
        break;
      case 'восемь':
        resultCount = 8;
        break;
      case 'девять':
        resultCount = 9;
        break;
      case 'десять':
        resultCount = 10;
        break;
    }
    return resultCount;
  }

  generateOrder(msg) {
    const splitMsg = msg.split(' ')
    const product = this.state.products.filter((product) => product.name === splitMsg[0])[0]
    if (numbersLangEquals.indexOf(splitMsg[1]) === -1) {
      this.say('Вы неверно указали количество продукта')
    }
    else if (!product) {
      this.say('Названного продукта нет в наличии')
    }
    else if (this.getMeasureByWord(splitMsg[2]) !== product.measure) {
      this.say('Неверный тип количества продуктов')
    }
    else {
      this.say(`Продукт добавлен к заказу!`)
      const order = this.state.order
      let issetProduct = false
      order.forEach((item, i, arr) => {
        if (item.name === splitMsg[0]) {
          item.count += +this.formatCount(splitMsg[1])
          item.price = item.count * product.price
          issetProduct = true
        }
      });
      if (!issetProduct) {
        const count =  +this.formatCount(splitMsg[1])
        product.price *= count
        order.push({count: count, ...product})
      }
      this.setState({order: order})
    }
  }

  resetOrder() {
    this.setState({
      isOrderStart: false,
      order: [],
      isAccept: false
    })
  }

  replyHandler() {
    const cliMsg = this.state.clientMessage.toLowerCase()
    this.addNewMessage('Вы', cliMsg)
    if (cliMsg.includes('хочу') && cliMsg.includes('сделать') && cliMsg.includes('заказ')) {
      this.resetOrder()
      this.setState({isOrderStart: true})
      this.say('Что вас интересует?')
    }
    else if (cliMsg.includes('привет') || cliMsg.includes('здравствуйте') || cliMsg.includes('хай')) {
      this.say('Приветствую!')
    }
    else if (cliMsg.includes('пока') || cliMsg.includes('до свидания')) {
      this.resetOrder()
      this.say('Спасибо за приятный диалог, всего доброго!')
      this.props.setStateButtonSpeak(false)
    }
    else if (cliMsg.includes('передумал') || cliMsg.includes('отбой')) {
      if (this.state.isOrderStart) {
        this.say('Ваш заказ отменен - если что-то нужно - скажите!')
      } else {
        this.say('Если заказ был - то он отменен!')
      }
      this.resetOrder()
    }
    else if ((cliMsg.includes('всё') || (cliMsg.includes('завершить') && cliMsg.includes('заказ')))) {
      if (this.state.isOrderStart && this.state.order.length > 0) {
        this.say('Спасибо! Ваш заказ сформирован')
        this.setState({isAccept: true, isOrderStart: false})
      }
      else {
        this.say('В вашем заказе нет продуктов. Начните новый заказ!')
        this.resetOrder()
      }
    }
    else if (this.state.isOrderStart) {
      if (this.isMsgIsLikeProduct(cliMsg)) {
        this.generateOrder(cliMsg)
      } else {
        this.say('Проверьте правильность продукта!')
      }
    }
    else {
      this.say('Неверный запрос, возможно вы хотите начать новый заказ?')
    }
  }

  setProducts(products) {
    this.setState({products: products})
  }

  render() {
    return (
      <div>
        <br/>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <ManagerChat messages={this.state.messages}/>
                <br/>
                <OrderList
                  order={this.state.order}
                  isAccept={this.state.isAccept}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody>
                <ProductsConfigurator
                  products={this.state.products}
                  setProducts={this.setProducts}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardBody>
                <CommandsHelp/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SpeakManager
