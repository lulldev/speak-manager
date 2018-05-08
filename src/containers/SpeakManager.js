import React from 'react'
import {store} from '../store'

class SpeakManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientMessage: '',
    };

    store.subscribe(() => {
      this.setState({
        clientMessage: store.getState().buttonSpeak.voiceAnswer
      });
    });
  }

  render() {
    return (
      <div>
        Hello! I'm manager
        your message is: { this.state.clientMessage }
      </div>
    );
  }
}

export default SpeakManager
