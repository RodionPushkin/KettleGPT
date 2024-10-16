import React, { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

import { toggleMute, updateSoundCounter } from "../store/slices/soundSlice";
import { RootState } from "../store/store";

const SoundContext = createContext<any>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const sounds = useSelector((state: RootState) => state.sound.sounds);
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  const dispatch = useDispatch();
  const windowVisibleTimeout = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();
  const soundContextValue: any = {
    toggle: () => {
      dispatch(toggleMute());
      for (const key of Object.keys(soundContextValue)) {
        if (key == "toggle" || !soundContextValue[key].loop) continue;
        if (isMuted) fade(soundContextValue[key].sound, true);
        else fade(soundContextValue[key].sound, false);
      }
    },
  };
  const fade = (sound: any, direction: boolean = true) => {
    let counter: number = 0;
    if (interval.current !== null) clearInterval(interval.current);

    if (direction) sound.volume(0);

    interval.current = setInterval(() => {
      counter += 0.1;
      if (direction) {
        sound.volume(0 + counter);
      } else {
        sound.volume(0.8 - counter);
      }
      if (counter >= 0.8) clearInterval(interval.current);
    }, 50);
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
          autoplay: source.repeat,
          volume: source.repeat ? 0 : 1,
        },
      );
      players.push({ play, stop, duration, loop: source.repeat, sound });
    }
    soundContextValue[key] = {
      play: () => {
        dispatch(updateSoundCounter(key));
        players[current.counter || 0].play();
        if (!isMuted) {
          if (key === "click" && "vibrate" in navigator)
            navigator.vibrate(Math.round(Math.random() * 10) + 40);
          else console.log("Вибрация не поддерживается");
        }
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
      if (windowVisibleTimeout.current !== null)
        clearTimeout(windowVisibleTimeout.current);

      windowVisibleTimeout.current = setTimeout(() => {
        if (!isMuted && Object.keys(soundContextValue).length > 1)
          for (const key of Object.keys(soundContextValue)) {
            if (key == "toggle" || !soundContextValue[key].loop) continue;
            if (!document.hidden) fade(soundContextValue[key].sound, true);
            else fade(soundContextValue[key].sound, false);
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
