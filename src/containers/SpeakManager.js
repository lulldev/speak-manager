import React from 'react'
import {store} from '../store'
import PropTypes from "prop-types";

class SpeakManager extends React.Component {

  static propsTypes = {
    blockButtonSpeak: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      clientMessage: '',
      responseMessage: ''
    }

    store.subscribe(() => {
      this.setState({
        clientMessage: store.getState().buttonSpeak.voiceAnswer
      })
    })

    this.say = this.say.bind(this)
    this.replyHandler = this.replyHandler.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.clientMessage !== prevState.clientMessage && this.state.clientMessage !== '') {
      this.replyHandler()
    }
  }

  componentDidMount() {
    const msg = 'Привет, я ваш менеджер. Что бы вы хотели?'
    this.say(msg)
  }

  say(what) {
    this.setState({responseMessage: what})
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

  replyHandler() {
    // todo: response to client
    this.say('ха ха ха')
  }

  render() {
    return (
      <div>
        <h1 className="mt-5">{ this.state.responseMessage }</h1>
      </div>
    );
  }
}

export default SpeakManager
