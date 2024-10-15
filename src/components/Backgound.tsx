import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import { useErrorBoundary } from "use-error-boundary";

import fragmentShader from "../feautures/fragmentShader.js";
import vertexShader from "../feautures/vertexShader.js";
const Backgound: React.FC<{ className?: string }> = ({ className }) => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
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
      alpha: 0,
      beta: 0,
      gamma: 0,
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
          meshRef.current.rotation.x =
            orientation.current.beta * (Math.PI / 180);
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
            window.innerWidth > 1024 ? 256 : 64,
            window.innerWidth > 1024 ? 256 : 64,
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
  return (
    <div
      className={
        "absolute top-0 left-0 w-full h-full xl:static select-none " + className
      }
    >
      {didCatch ? (
        <div>{error.message}</div>
      ) : (
        <ErrorBoundary>
          <Canvas
            className="absolute top-0 left-0 w-full xl:static"
            style={{
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
            dpr={window.innerWidth > 1024 ? [1, 2] : [0, 1]}
          >
            <Scene />

            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Backgound;
