import React from 'react'
import SpeakManager from './SpeakManager'
import ButtonSpeak from '../components/ButtonSpeak/ButtonSpeak';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'

import {
  setStateButtonSpeak,
  setCompleteSayWord,
  setVoiceAnswer
} from '../actions/button-speak'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.setVoiceAnswer('')
    this.props.setCompleteSayWord(false)
    this.props.setStateButtonSpeak(false)
  }
  render() {
    return (
      <div>
        <SpeakManager />
        <ButtonSpeak
          setStateButtonSpeak={ this.props.setStateButtonSpeak }
          setCompleteSayWord={ this.props.setCompleteSayWord }
          setVoiceAnswer={ this.props.setVoiceAnswer }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStateButtonSpeak: bindActionCreators(setStateButtonSpeak, dispatch),
  setCompleteSayWord: bindActionCreators(setCompleteSayWord, dispatch),
  setVoiceAnswer: bindActionCreators(setVoiceAnswer, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
