const initialState = {
  isPressedButtonSpeak: false,
  isCompleteSayWord: false,
  voiceAnswer: '',
  error: ''
}

const buttonSpeak = (state = initialState, action) => {
  switch(action.type) {

    case 'SET_STATE_BUTTON_SPEAK':
      return {
        ...state,
        isPressedButtonSpeak: action.state
      }

    case 'SET_COMPLETE_SAY_WORD':
      return {
        ...state,
        isCompleteSayWord: action.isCompleteSay
      }

    case 'SET_VOICE_ANSWER':
      return {
        ...state,
        voiceAnswer: action.voice,
      }

    case 'SET_INITIAL_STATE':
      return initialState

    default:
      return state
  }
}

export default buttonSpeak