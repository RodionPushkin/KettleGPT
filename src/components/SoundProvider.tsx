import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

import { toggleMute, updateSoundCounter } from "../store/slices/soundSlice";
import { RootState } from "../store/store";

const SoundContext = createContext<any>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const sounds = useSelector((state: RootState) => state.sound.sounds);
  const dispatch = useDispatch();
  let windowVisibleTimeout: number = 0;
  const soundContextValue: any = {
    toggle: () => {
      dispatch(toggleMute());
      for (const key of Object.keys(soundContextValue)) {
        if (key == "toggle" || !soundContextValue[key].loop) continue;
        if (isMuted)
          fade(soundContextValue[key].sound, true, soundContextValue[key].play);
        else
          fade(
            soundContextValue[key].sound,
            false,
            soundContextValue[key].stop,
          );
      }
    },
  };
  const fade = (
    sound: any,
    direction: boolean = true,
    callback: () => void,
  ) => {
    let counter: number = 0;
    if (direction && callback) {
      sound.volume(0);
      callback();
    }
    const interval = setInterval(() => {
      counter += 0.1;
      if (direction) {
        sound.volume(0 + counter);
      } else {
        sound.volume(1 - counter);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      if (!direction && callback) callback();
    }, 1000);
  };
  for (const key of Object.keys(sounds)) {
    const current = sounds[key];
    const players: any = [];
    for (let i = 0; i < current.source.length; i++) {
      const source = current.source[i];
      const [play, { stop, duration, sound }] = useSound(
        `/sounds/${source.src}`,
        {
          soundEnabled: source.repeat ? undefined : !isMuted,
          loop: source.repeat,
        },
      );
      players.push({ play, stop, duration, loop: source.repeat, sound });
    }
    soundContextValue[key] = {
      play: () => {
        dispatch(updateSoundCounter(key));
        players[current.counter || 0].play();
      },
      stop: () => {
        players.map((player: any) => player.stop());
      },
      loop: players[0].loop,
      sound: players[0].sound,
    };
  }
  useEffect(() => {
    const handleVisibilityChange = () => {
      clearTimeout(windowVisibleTimeout);
      windowVisibleTimeout = setTimeout(() => {
        if (!isMuted && Object.keys(soundContextValue).length > 1)
          for (const key of Object.keys(soundContextValue)) {
            if (key == "toggle" || !soundContextValue[key].loop) continue;
            if (!document.hidden) {
              soundContextValue[key].play();
              fade(
                soundContextValue[key].sound,
                true,
                soundContextValue[key].play,
              );
            } else
              fade(
                soundContextValue[key].sound,
                false,
                soundContextValue[key].stop,
              );
          }
      }, 1000);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [soundContextValue]);
  return (
    <SoundContext.Provider value={soundContextValue}>
      {children}
    </SoundContext.Provider>
  );
};
export const useSoundContext = () => useContext(SoundContext);
