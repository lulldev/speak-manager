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

export const blockButtonSpeak = isBlock => {
  return {
    type: 'BLOCK_BUTTON_SPEAK',
    isBlock
  }
}
