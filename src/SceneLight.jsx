import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export function SceneLight({ nodes }) {
  const light = useRef();
  const { viewport } = useThree();
  const mousePos = useRef(new Vector3(0, 0, 5));

  useEffect(() => {
    const handleMouseMove = event => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (light.current) {
      // Convert normalized coordinates to world space
      const x = (mousePos.current.x * viewport.width) / 2;
      const y = (mousePos.current.y * viewport.height) / 2;

      // Smoothly update light position
      light.current.position.x = x * 2;
      light.current.position.y = y * 2 + 4; // Add offset for better lighting angle
      light.current.position.z = 3;

      // Make light look at center
      if (light.current.target) {
        light.current.target.position.set(0, 0, 0);
        light.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <directionalLight
      ref={light}
      intensity={100}
      decay={2}
      color='#fffdf4'
      position={[-4.778, 4.051, -0.697]}
      rotation={[1.303, -0.602, 1.21]}
      scale={[-1.66, -0.14, -1]}
      target={nodes?.Light?.target}
    >
      {nodes?.Light?.target && <primitive object={nodes.Light.target} position={[0, 0, -1]} />}
      {nodes?.Light?.target && <primitive object={nodes.Light.target} />}
    </directionalLight>
  );
}
