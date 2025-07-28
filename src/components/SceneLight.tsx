import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionalLight, Vector2, Vector3 } from "three";

export function SceneLight({ mousePos }: { mousePos: Vector2 }) {
  const light = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (light.current) {
      const distanceFromCamera = 100;
      const lightPosition = new Vector3(
        mousePos.x * distanceFromCamera,
        mousePos.y * distanceFromCamera,
        0
      );

      light.current.position.copy(lightPosition);
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
    }
  });

  return (
    <directionalLight
      ref={light}
      castShadow
      intensity={1.5}
      position={[0, 0, 5]}
    >
      <object3D ref={light.current?.target} position={[0, 0, 0]} />
    </directionalLight>
  );
}
