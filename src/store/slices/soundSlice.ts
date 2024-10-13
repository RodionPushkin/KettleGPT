import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SoundState } from "../../types";

const initialState: SoundState = {
  isMuted: true,
  sounds: {
    click: {
      source: [
        {
          src: "click_0.ogg",
        },
        {
          src: "click_1.ogg",
        },
      ],
    },
    hover: {
      source: [
        { src: "hover_0.ogg" },
        { src: "hover_1.ogg" },
        { src: "hover_2.ogg" },
      ],
    },
    pageEnter: {
      source: [
        {
          src: "page_1.ogg",
        },
      ],
    },
    pageExit: {
      source: [{ src: "page_0.ogg" }],
    },
    generic: {
      source: [{ src: "generic.ogg", repeat: true }],
    },
  },
};

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    toggleMute: (state: SoundState) => {
      state.isMuted = !state.isMuted;
    },
    updateSoundCounter: (state: SoundState, action: PayloadAction<string>) => {
      const sound = state.sounds[action.payload];
      let counter = sound.counter;
      if (counter == undefined || counter == sound.source.length - 1)
        counter = 0;
      else counter++;
      state.sounds[action.payload].counter = counter;
    },
  },
});

export const { toggleMute, updateSoundCounter } = soundSlice.actions;
export default soundSlice.reducer;
