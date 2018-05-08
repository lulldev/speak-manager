import React from 'react'
import { Button } from 'reactstrap'
import './ButtonSpeak.css'
import PropTypes from 'prop-types'
import { FormGroup } from 'reactstrap';

export const speechRecognizer = new window.webkitSpeechRecognition()

class ButtonSpeak extends React.Component {
  static propsTypes = {
    setStateButtonSpeak: PropTypes.func.isRequired,
    setCompleteSayWord: PropTypes.func.isRequired,
    setVoiceAnswer: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'ready',
      hint: '',
    }
    this.onPressed = this.onPressed.bind(this)
    this.startConverting = this.startConverting.bind(this)
    this.onErrorConverting = this.onErrorConverting.bind(this)
    this.showBtnStatusText = this.showBtnStatusText.bind(this)
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
    if (this.state.status === 'ready') {
      this.props.setStateButtonSpeak(true)
      this.setState({
        status: 'record',
      })
      this.startConverting()
    } else {
      speechRecognizer.stop()
      this.setState({
        status: 'ready',
      })
    }
  }

  startConverting() {
    if ('webkitSpeechRecognition' in window) {
      this.setState({ status: 'process' })
      speechRecognizer.continuous = false
      speechRecognizer.interimResults = true
      speechRecognizer.lang = 'ru-RU'
      speechRecognizer.start()

      var finalTranscripts = ''

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
        console.log(finalTranscripts);
        this.props.setVoiceAnswer(finalTranscripts)
        this.setState({ status: 'ready' })
      }.bind(this)
      speechRecognizer.onerror = this.onErrorConverting
    } else {
      this.setState({ 
        status: 'ready',
        hint: 'Ваш браузер не поддерживает данную функцию!'
      })
    }
  }

  onErrorConverting(event) {
    console.log(event.error)
    speechRecognizer.stop()
    this.setState({
      status: 'ready',
    })

    switch (event.error) {
      case 'not-allowed' || 'service-not-allowed':
        this.setState({ hint: 'Разрешите доступ к микрофону!' })
        break

      case 'network':
        this.setState({ hint: 'Ошибка! Проверьте интернет-соединение!' })
        break

      case 'aborted':
        this.setState({ hint: 'Речевой ввод был прерван!' })
        break
      
      case 'no-speech':
        this.setState({ hint: 'Никакой речи не было обнаружено!' })
        break

      case 'bad-grammar':
        this.setState({ hint: 'Произошла ошибка в грамматике' +
                              'распознавания речи!' })
        break

      case 'language-not-supported':
        this.setState({ hint: 'Данный язык не поддерживался!' })
        break

      default:
        this.setState({ hint: `Error! - ${event.error}` })
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
            color='success'>
            { this.showBtnStatusText() }
          </Button>
          <div className='help-text'>{this.state.hint}</div>
        </FormGroup>
      </div>
    )
  }
}


export default ButtonSpeak
