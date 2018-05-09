import React from 'react'
import {store} from '../store'
import PropTypes from "prop-types";

import OrderList from '../components/OrderList/OrderList'
import ManagerChat from '../components/ManagerChat/ManagerChat'

import products from '../data/products';

const numbersLangEquals = [
  'одну',
  'одна',
  'две',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
  'десять'
]

class SpeakManager extends React.Component {

  static propsTypes = {
    blockButtonSpeak: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      clientMessage: '',
      responseMessage: '',
      isOrderStart: false,
      order: [],
      nextMessage: null,
      messages: []
    }

    store.subscribe(() => {
      this.setState({
        clientMessage: store.getState().buttonSpeak.voiceAnswer
      })
    })

    this.say = this.say.bind(this)
    this.replyHandler = this.replyHandler.bind(this)
    this.addNewMessage = this.addNewMessage.bind(this)
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
      && products.some((product) => product.name === splitMsg[0])
      && numbersLangEquals.indexOf(splitMsg[1]) > -1
  }

  replyHandler() {
    const cliMsg = this.state.clientMessage.toLowerCase()
    this.addNewMessage('Вы', cliMsg)
    if (cliMsg.includes('хочу') && cliMsg.includes('сделать') && cliMsg.includes('заказ')) {
      if (!this.state.isOrderStart) {
        this.setState({isOrderStart: true})
        this.say('Что вас интересует?')
      } else {
        this.say('Какой продукт вас интересует?')
      }
    }
    else if (cliMsg.includes('привет') || cliMsg.includes('здравствуйте') || cliMsg.includes('хай')) {
      this.say('Приветствую!')
    }
    else if (cliMsg.includes('пока') || cliMsg.includes('до свидания')) {
      if (this.state.isOrderStart) {
        this.say('Ваш заказ отменен, всего доброго!')
      } else {
        this.say('Спасибо за приятный диалог, всего доброго!')
      }
      this.setState({isOrderStart: false})
    }
    else if (cliMsg.includes('передумал') || cliMsg.includes('отбой')) {
      if (this.state.isOrderStart) {
        this.say('Ваш заказ отменен - если что-то нужно - скажите!')
        this.setState({isOrderStart: false})
      } else {
        this.say('Если заказ был - то он отменен!')
      }
    }
    else if (this.state.isOrderStart && this.isMsgIsLikeProduct(cliMsg)) {
      this.say('Добавлено в заказ, что то ещё?')
    }
    else if (this.state.isOrderStart && (cliMsg.includes('всё') || (cliMsg.includes('завершить') && cliMsg.includes('заказ')))) {
      this.say('Спасибо! Ваш заказ сформирован')
      // todo display
    }
    else {
      if (this.state.isOrderStart) {
        this.say('Извините, данного продукта нет в наличии!')
      } else {
        this.say('Извините, возможно я вас неправильно поняла?')
      }
    }
  }

  render() {
    console.log(this.state.messages)
    return (
      <div>
        <ManagerChat messages={this.state.messages}/>
        <OrderList/>
      </div>
    );
  }
}

export default SpeakManager
