import React from 'react'
import { Button } from 'reactstrap'
import './ButtonSpeak.css'
import PropTypes from 'prop-types'
import { FormGroup } from 'reactstrap';

export const speechRecognizer = new window.webkitSpeechRecognition()

class ButtonSpeak extends React.Component {
  static propsTypes = {
    setStateButtonSpeak: PropTypes.func.isRequired,
    setVoiceAnswer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'ready',
      hint: '',
      isRecognizing: false,
      isOnSpeaker: true,
      order: [],
      lastTranscript: ''
    }

    this.onPressed = this.onPressed.bind(this)
    this.startConverting = this.startConverting.bind(this)
    this.stopConverting = this.stopConverting.bind(this)
    this.onErrorConverting = this.onErrorConverting.bind(this)
    this.showBtnStatusText = this.showBtnStatusText.bind(this)

    this.startConverting()
  }

  showBtnStatusText() {
    if (this.state.status === 'ready') {
      return 'Записать голосовое сообщение';
    }
    else if (this.state.status === 'process') {
      return 'Обработка';
    }
    else if (this.state.status === 'record') {
      return 'Идет запись';
    }
  }

  onPressed() {
    if (this.state.isOnSpeaker) {
      this.setState({isOnSpeaker: false})
      this.stopConverting()
    } else {
      this.setState({isOnSpeaker: true})
      this.startConverting()
    }
  }

  startConverting() {
    if ('webkitSpeechRecognition' in window) {
      let finalTranscripts = ''

      speechRecognizer.onstart = function () {
        this.setState({isRecognizing: true, hint: ''})
      }.bind(this)

      speechRecognizer.onend = function (event) {
        this.setState({isRecognizing: false})
      }.bind(this)

      speechRecognizer.onerror = function (event) {
        this.setState({isRecognizing: false})
        this.onErrorConverting(event)
      }.bind(this)

      speechRecognizer.onresult = function(event) {
        var interimTranscripts = ''
        for (var i = event.resultIndex; i < event.results.length; i++) {
          var transcript = event.results[i][0].transcript
          transcript.replace("\n", "<br>")
          if (event.results[i].isFinal) {
            finalTranscripts += transcript
          } else {
            interimTranscripts += transcript
          }
        }
        this.props.setVoiceAnswer(
          finalTranscripts.substr(
            this.state.lastTranscript.length === 0 ? 0 : this.state.lastTranscript.length + 1,
            finalTranscripts.length
          )
        )
        this.setState({lastTranscript: finalTranscripts})
      }.bind(this)

      speechRecognizer.continuous = true
      speechRecognizer.interimResults = true
      speechRecognizer.lang = 'ru-RU'

      if (!this.state.isRecognizing) {
        speechRecognizer.start()
      }

    } else {
      this.setState({ 
        status: 'ready',
        hint: 'Ваш браузер не поддерживает данную функцию!'
      })
    }
  }

  stopConverting() {
    speechRecognizer.stop()
  }

  onErrorConverting(event) {
    speechRecognizer.stop()
    this.setState({
      status: 'ready',
    })

    switch (event.error) {
      case 'not-allowed' || 'service-not-allowed':
        this.setState({ hint: 'Разрешите доступ к микрофону!', isOnSpeaker: false })
        break

      case 'network':
        this.setState({ hint: 'Ошибка! Проверьте интернет-соединение!', isOnSpeaker: false })
        break

      case 'aborted':
        this.setState({ hint: 'Речевой ввод был прерван!', isOnSpeaker: false })
        break
      
      case 'no-speech':
        this.setState({ hint: 'Никакой речи не было обнаружено!', isOnSpeaker: false })
        break

      case 'bad-grammar':
        this.setState({ hint: 'Произошла ошибка в грамматике' +
                              'распознавания речи!', isOnSpeaker: false })
        break

      case 'language-not-supported':
        this.setState({ hint: 'Данный язык не поддерживался!', isOnSpeaker: false })
        break

      default:
        this.setState({ hint: `Error! - ${event.error}`, isOnSpeaker: false })
        break
    }
  }

  render() {
    return (
      <div>
        <FormGroup>
          <Button
            onClick={ this.onPressed }
            className='button-speak'
            color={ this.state.isOnSpeaker ? 'danger' : 'success' }
          >
            { this.state.isOnSpeaker ? 'Остановить запись голоса' : 'Начать голосовой сеанс' }
          </Button>
          <div>
            <small className='help-text text-danger'>{this.state.hint}</small>
          </div>
        </FormGroup>
      </div>
    )
  }
}


export default ButtonSpeak
