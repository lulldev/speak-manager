import React from 'react'
import PropTypes from 'prop-types'
import './ManagerChat.css'

class ManagerChat extends React.Component {
  static propsTypes = {
    messages: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    const managerChatElem = document.getElementsByClassName('manager-chat')[0]
    managerChatElem.scrollTop = managerChatElem.scrollHeight
  }

  render() {
    if (this.props.messages.length === 0) {
      return null
    }
    return (
      <div className="manager-chat">
        {this.props.messages.map((message, i) => <div key={i}>{message.who}: {message.text}</div>)}
      </div>
    )
  }
}


export default ManagerChat
