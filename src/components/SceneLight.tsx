import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionalLight, Vector2, Vector3 } from "three";
import { useControls } from "leva";

export function SceneLight({ mousePos }: { mousePos: Vector2 }) {
  const light = useRef<DirectionalLight>(null);

  const controls = useControls("Light", {
    dynamic: {
      value: false,
      label: "Dynamic",
    },
  });

  useFrame(() => {
    if (!light.current || !controls.dynamic) return;
    const distanceFromCamera = 10;
    const lightPosition = new Vector3(
      mousePos.x * distanceFromCamera,
      mousePos.y * distanceFromCamera,
      0
    );

    light.current.position.copy(lightPosition);
    light.current.target.position.set(0, 0, 0);
    light.current.target.updateMatrixWorld();
  });

  return (
    <directionalLight
      ref={light}
      castShadow
      intensity={0.1}
      position={[5, 5, 5]}
    >
      <object3D ref={light.current?.target} position={[0, 0, 0]} />
    </directionalLight>
  );
}
