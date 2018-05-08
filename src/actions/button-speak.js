export const setCompleteSayWord = isCompleteSay => {
  return {
    type: 'SET_COMPLETE_SAY_WORD',
    isCompleteSay
  }
}

export const setStateButtonSpeak = state => {
  return {
    type: 'SET_STATE_BUTTON_SPEAK',
    state
  }
}

export const setVoiceAnswer = voice => {
  return {
    type: 'SET_VOICE_ANSWER',
    voice
  }
}
