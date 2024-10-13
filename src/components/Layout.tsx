import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
// import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import { useErrorBoundary } from "use-error-boundary";

import fragmentShader from "../feautures/fragmentShader.js";
import vertexShader from "../feautures/vertexShader.js";
import { useSoundContext } from "./SoundProvider";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const Torus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  let toggleY: boolean = true;
  let toggleX: boolean = true;

  // Анимация
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current && materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      // meshRef.current.rotation.z += Math.random() <= 0.1 ? -0.1 : 0.1;
      // meshRef.current.rotation.z =
      //   Math.sin(elapsedTime) / 4 + elapsedTime / 20 + 5;

      // meshRef.current.rotation.x += 0.01;
      // meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.001;
      meshRef.current.rotation.y += 0.001 * (toggleY ? -1 : 1);
      meshRef.current.rotation.x += 0.001 * (toggleX ? -1 : 1);
      if (meshRef.current.rotation.y >= 0.6) toggleY = true;
      else if (meshRef.current.rotation.y <= -0.6) toggleY = false;
      if (meshRef.current.rotation.x >= 0.6) toggleX = true;
      else if (meshRef.current.rotation.x <= -0.6) toggleX = false;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 256, 256]} />
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
      0.0001,
      0.01,
    );
    composer.current.addPass(bloomPass);
    console.log("bloom");
  }, [gl, scene, camera, size]);

  useEffect(() => {
    const animate = () => {
      composer.current?.render();
      requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => {
      animate();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
};

const Scene = React.memo(() => (
  <>
    <Torus />
    <Effects />
  </>
));

const Layout: React.FC = () => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  const { pageEnter } = useSoundContext();
  const cameraRef = useRef(null);
  useEffect(() => {
    if (cameraRef.current) {
      setInterval(() => {
        if (cameraRef.current.position.z < 5) {
          cameraRef.current.position.z += 0.15;
        }
      }, 10);
    }
  }, [cameraRef.current]);
  // useEffect(() => {
  //   const animateValue = async () => {
  //     await controls.start({ value: 100 });
  //     setValue(100);
  //   };

  //   animateValue();
  // }, [controls]);

  return (
    <div className="min-h-screen">
      <Link to="/"></Link>
      <div>
        {didCatch ? (
          <div>{error.message}</div>
        ) : (
          <ErrorBoundary>
            <Canvas
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: -1,
              }}
              // shadowmap="true"
              // flat
              // gl={{
              //   toneMapping: THREE.ACESFilmicToneMapping,
              //   toneMappingExposure: 2,
              //   powerPreference: "high-performance",
              //   outputColorSpace: "srgb",
              //   antialias: true,
              // }}
              dpr={[2, 4]}
            >
              {/* <Stats /> */}

              <Scene />

              <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[0, 0, 0]}
              />
            </Canvas>
          </ErrorBoundary>
        )}
      </div>
      <button
        onClick={() => {
          pageEnter.play();
        }}
        className="py-2 text-white"
      >
        открыть
      </button>
      <main className="z-10 text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
