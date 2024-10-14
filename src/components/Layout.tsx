import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import { useErrorBoundary } from "use-error-boundary";

import logo from "/favicon.svg";

import fragmentShader from "../feautures/fragmentShader.js";
import vertexShader from "../feautures/vertexShader.js";
import { RootState } from "../store/store";
import { useSoundContext } from "./SoundProvider";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const Torus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  let toggleY: boolean = true;
  let toggleX: boolean = true;
  let toggleDisplace: boolean = true;
  type Orientation = {
    alpha: number;
    beta: number;
    gamma: number;
  };
  const orientation = useRef<Orientation>({
    alpha: 0, // Угол вокруг оси Z
    beta: 0, // Угол вокруг оси X
    gamma: 0, // Угол вокруг оси Y
  });
  const lastOrientation = useRef<Orientation[]>([]);

  const calcAvgOrientation = (data: Array<Orientation>) => {
    const total = data.reduce(
      (acc: Orientation, item: Orientation) => {
        acc.alpha += item.alpha;
        acc.beta += item.beta;
        acc.gamma += item.gamma;
        return acc;
      },
      { alpha: 0, beta: 0, gamma: 0 },
    );

    const count = data.length;

    return {
      alpha: total.alpha / count || 0,
      beta: total.beta / count || 0,
      gamma: total.gamma / count || 0,
    };
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lastOrientation.current.length > 10) {
        lastOrientation.current.splice(0, 5);
      }
      lastOrientation.current.push(orientation.current);
    }, 1000);

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const avgOrientation = calcAvgOrientation(lastOrientation.current);
      const alpha = event.alpha || 0;
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;
      const minmax = (value: number) =>
        Math.max(Math.min(value, 30), -30) * 0.5;
      orientation.current = {
        alpha: minmax(alpha - avgOrientation.alpha),
        beta: minmax(beta - avgOrientation.beta),
        gamma: minmax(gamma - avgOrientation.gamma),
      };
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, false);
    } else {
      console.log("Device Orientation API не поддерживается.");
    }

    // Убираем обработчик при размонтировании компонента
    return () => {
      clearTimeout(timeout);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          "deviceorientation",
          handleOrientation,
          false,
        );
      }
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      if (
        orientation.current.alpha == 0 &&
        orientation.current.beta == 0 &&
        orientation.current.gamma == 0
      ) {
        meshRef.current.rotation.y += 0.001 * (toggleY ? -1 : 1);
        meshRef.current.rotation.x += 0.001 * (toggleX ? -1 : 1);

        if (meshRef.current.rotation.y >= 0.6) toggleY = true;
        else if (meshRef.current.rotation.y <= -0.6) toggleY = false;
        if (meshRef.current.rotation.x >= 0.6) toggleX = true;
        else if (meshRef.current.rotation.x <= -0.6) toggleX = false;
      } else {
        meshRef.current.rotation.x = orientation.current.beta * (Math.PI / 180);
        meshRef.current.rotation.y =
          orientation.current.gamma * (Math.PI / 180);
      }
      meshRef.current.rotation.z += 0.001;
      materialRef.current.uniforms.uDisplace.value +=
        0.001 * (toggleDisplace ? -1 : 1);
      if (materialRef.current.uniforms.uDisplace.value >= 2.5)
        toggleDisplace = true;
      else if (materialRef.current.uniforms.uDisplace.value <= 1)
        toggleDisplace = false;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry
        args={[
          window.innerWidth > 1024 ? 1 : 0.8,
          window.innerWidth > 1024 ? 0.3 : 0.2,
          window.innerWidth > 1024 ? 256 : 100,
          window.innerWidth > 1024 ? 256 : 100,
        ]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2() },
          uDisplace: { value: 2 },
          uSpread: { value: 1.5 },
          uNoise: { value: 16 },
          uColor: { value: new THREE.Color("#B655FE") },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Effects = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();

  useEffect(() => {
    // Настройки EffectComposer
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.9, // bloom strength
      0.001,
      0.01,
    );
    composer.current.addPass(bloomPass);
  }, [gl, scene, camera, size]);
  const animate = () => {
    composer.current?.render();
    requestAnimationFrame(animate);
  };
  animate();

  return null;
};

const Scene = React.memo(() => (
  <>
    <Torus />
    <Effects />
  </>
));
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
        for (let i = 1; i < cx * 3; i++) {
          const x = i + frame;
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
            "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        ref={canvas}
      />
    </div>
  );
};
const Layout: React.FC = () => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const { click, hover } = useSoundContext();
  return (
    <>
      <header className="fixed top-6 left-0 flex justify-center w-screen z-50 px-4">
        <div className="flex w-full h-16 gap-4 items-center bg-transparent rounded-full px-6 max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <Link
            to="/"
            className="text-l sm:text-xl font-bold flex items-center gap-2"
          >
            <img className="h-6 sm:h-8" src={logo} alt="logo" />
            <h1>
              {"Kettle GPT".split("").map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 10 + 0.5,
                  }}
                  key={i}
                >
                  {el}
                </motion.span>
              ))}
              {"...".split("").map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: i / 10 + 0.5 + 3,
                    repeat: Infinity,
                  }}
                  key={i}
                >
                  {el}
                </motion.span>
              ))}
            </h1>
          </Link>
          <MuteButton />
          <div
            className="group flex bg-primary p-2 items-center gap-2 cursor-pointer rounded-full w-10 h-10 sm:hover:rotate-90 transition-all duration-300"
            onClick={click.play}
            onMouseEnter={hover.play}
          >
            <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
            <div className="w-2 h-2 sm:group-hover:h-3 transition-all duration-300 bg-black rounded-full" />
          </div>
        </div>
      </header>
      <div className="min-h-mobile-screen xl:columns-2 relative">
        <div className="absolute top-0 left-0 w-full h-full xl:relative">
          {didCatch ? (
            <div>{error.message}</div>
          ) : (
            <ErrorBoundary>
              <Canvas
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "var(--wh)",
                  pointerEvents: "none",
                }}
                flat
                gl={{
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 2,
                  powerPreference: "high-performance",
                  outputColorSpace: "srgb",
                  antialias: true,
                }}
                dpr={window.innerWidth > 1024 ? [2, 4] : [0, 1]}
              >
                <Scene />

                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              </Canvas>
            </ErrorBoundary>
          )}
        </div>
        <main className="relative z-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
