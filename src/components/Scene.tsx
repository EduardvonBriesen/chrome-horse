import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

type PresetType =
  | "studio"
  | "sunset"
  | "dawn"
  | "night"
  | "warehouse"
  | "apartment"
  | "city"
  | "forest"
  | "lobby"
  | "park";

interface EnvironmentOption {
  label: string;
  value: string;
  preset?: PresetType;
  files?: string;
  environmentRotation: [number, number, number];
  environmentIntensity: number;
}

const environmentOptions = [
  {
    label: "Office 1",
    value: "office-1",
    files: "/office-1.jpg",
  },
  {
    label: "Office 2",
    value: "office-2",
    files: "/office-2.jpg",
  },
  {
    label: "Texture 1",
    value: "texture-1",
    files: "/texture-1.jpg",
  },
  {
    label: "Studio",
    value: "studio",
    preset: "studio" as PresetType,
  },
  {
    label: "Sunset",
    value: "sunset",
    preset: "sunset" as PresetType,
  },
  {
    label: "Dawn",
    value: "dawn",
    preset: "dawn" as PresetType,
  },
  {
    label: "Night",
    value: "night",
    preset: "night" as PresetType,
  },
  {
    label: "Warehouse",
    value: "warehouse",
    preset: "warehouse" as PresetType,
  },
];

export function Scene() {
  const ref = useRef<OrbitControlsType>(null);

  const controls = useControls({
    env: {
      value: "office-1",
      options: environmentOptions.reduce((acc, option) => {
        acc[option.label] = option.value;
        return acc;
      }, {} as Record<string, string>),
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

  useFrame((state) => {
    if (controls.spin && ref.current) {
      ref.current.setAzimuthalAngle(state.clock.elapsedTime * 0.5);
    }
  });

  const selectedOption = environmentOptions.find(
    (option) => option.value === controls.env
  ) as EnvironmentOption;

  return (
    <>
      <Stage controls={ref} intensity={1} environment={null} shadows={false}>
        <Model compressed={controls.compressed} />
        <SceneLight />
        <Environment
          {...(selectedOption.preset
            ? { preset: selectedOption.preset }
            : { files: selectedOption.files })}
          environmentRotation={[0, controls.envRotation, 0]}
          environmentIntensity={controls.environmentIntensity}
        />
      </Stage>
      <OrbitControls ref={ref} enablePan={false} enableZoom={false} />
    </>
  );
}
