import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";

const environmentOptions = [
  { value: "office-1", label: "Office 1", preset: false },
  { value: "office-2", label: "Office 2", preset: false },
  { value: "texture-1", label: "Texture 1", preset: false },
  { value: "studio", label: "Studio", preset: true },
  { value: "sunset", label: "Sunset", preset: true },
  { value: "dawn", label: "Dawn", preset: true },
  { value: "night", label: "Night", preset: true },
  { value: "warehouse", label: "Warehouse", preset: true },
];

export function Scene() {
  const ref = useRef();

  const controls = useControls({
    env: {
      value: "office-1",
      options: environmentOptions.reduce((acc, option) => {
        acc[option.label] = option.value;
        return acc;
      }, {}),
      label: "Environment",
    },
    envRotation: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      label: "Rotation",
    },
    environmentIntensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
      label: "Brightness",
    },
    compressed: {
      value: false,
      label: "Compressed",
    },
    spin: {
      value: false,
      label: "Spin",
    },
  });

  useFrame(state => {
    if (controls.spin && ref.current) {
      ref.current.setAzimuthalAngle(state.clock.elapsedTime * 0.5);
    }
  });

  return (
    <>
      <Stage controls={ref} intensity={1} environment={null} shadows={false}>
        <Model compressed={controls.compressed} />
        <SceneLight />
        <Environment
          {...(environmentOptions.find(option => option.value === controls.env)?.preset
            ? { preset: controls.env }
            : { files: `/${controls.env}.jpg` })}
          environmentRotation={[0, controls.envRotation, 0]}
          environmentIntensity={controls.environmentIntensity}
        />
      </Stage>
      <OrbitControls ref={ref} enablePan={false} enableZoom={false} />
    </>
  );
}
