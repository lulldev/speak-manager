import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'

import {
  Container,
  Col,
  Row
} from 'reactstrap';

import {
  setStateButtonSpeak,
  setVoiceAnswer,
  blockButtonSpeak
} from '../actions/button-speak'

import SpeakManager from './SpeakManager'
import ButtonSpeak from '../components/ButtonSpeak/ButtonSpeak';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.setVoiceAnswer('')
    this.props.setStateButtonSpeak(false)
    this.props.blockButtonSpeak(true)
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col lg={{ size: 9, offset: 1 }}
                 className="text-center">
              <SpeakManager
                blockButtonSpeak={ this.props.blockButtonSpeak }
                setStateButtonSpeak={ this.props.setStateButtonSpeak }
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col lg={{ size: 9, offset: 1 }}
                 className="text-center">
              <ButtonSpeak
                setStateButtonSpeak={ this.props.setStateButtonSpeak }
                setVoiceAnswer={ this.props.setVoiceAnswer }
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clientMessage: state.voice,
  isBlock: state.isBlock
})

const mapDispatchToProps = (dispatch) => ({
  setStateButtonSpeak: bindActionCreators(setStateButtonSpeak, dispatch),
  setVoiceAnswer: bindActionCreators(setVoiceAnswer, dispatch),
  blockButtonSpeak: bindActionCreators(blockButtonSpeak, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
