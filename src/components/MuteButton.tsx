import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import { useSoundContext } from "./SoundProvider";

const MuteButton: React.FC = () => {
  const { toggle, hover, click } = useSoundContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const height = useRef(0);
  const frame = useRef(0);
  const toggleInterval = useRef(0);
  const toggleMute = () => {
    if (toggleInterval.current) {
      clearInterval(toggleInterval.current);
    }
    click.play();
    toggle();
    toggleInterval.current = setInterval(() => {
      if (isMuted) {
        if (height.current >= 10) height.current = 10;
        else height.current += 0.1;
      } else {
        if (height.current <= 0) height.current = 0;
        else height.current -= 0.1;
      }
      if (height.current >= 10 || height.current <= 0)
        clearInterval(toggleInterval.current);
    }, 10);
  };

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d")!;
      const draw = (frame: number) => {
        if (!canvas.current) return;
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.beginPath();
        const cx = canvas.current.width;
        const cy = canvas.current.height;
        ctx.moveTo(-cx * 2, cy / 2);
        for (let i = 1; i < cx * 9; i++) {
          const x = (i + frame) / 3;
          const y = 8 * Math.sin(((height.current * i) / 180) * Math.PI);
          ctx.lineTo(x - cx * 2, cy / 2 + y);
        }
        ctx.lineWidth = 3;
        ctx.stroke();
      };
      const interval = setInterval(() => {
        frame.current++;
        ctx.clearRect(0, 0, 100, 100);
        if (frame.current == 36) frame.current = 0;
        draw(frame.current);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [canvas.current]);
  return (
    <div
      className="bg-primary rounded-full ml-auto w-10 h-10 cursor-pointer flex place-content-center
      p-2"
      onClick={toggleMute}
      onMouseEnter={hover.play}
    >
      <canvas
        className="pointer-events-none"
        height="24px"
        width="24px"
        style={{
          maskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)",
        }}
        ref={canvas}
      />
    </div>
  );
};

export default MuteButton;
