const initialState = {
  isPressedButtonSpeak: false,
  voiceAnswer: '',
  isBlock: false,
  error: ''
}

const buttonSpeak = (state = initialState, action) => {
  switch(action.type) {

    case 'SET_STATE_BUTTON_SPEAK':
      return {
        ...state,
        isPressedButtonSpeak: action.state
      }

    case 'SET_VOICE_ANSWER':
      return {
        ...state,
        voiceAnswer: action.voice,
      }

    case 'BLOCK_BUTTON_SPEAK':
      return {
        ...state,
        isBlock: action.isBlock,
      }

    case 'SET_INITIAL_STATE':
      return initialState

    default:
      return state
  }
}

export default buttonSpeak