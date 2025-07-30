import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import { Vector2 } from "three";

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
  const { camera } = useThree();
  const [cameraInitialPosition] = useState(() => camera.position.clone());
  const mousePos = useRef(new Vector2(0, 0));

  console.log("camera", ref.current);

  const environment = useControls("Environment", {
    file: {
      value: "office-1",
      options: environmentOptions.reduce((acc, option) => {
        acc[option.label] = option.value;
        return acc;
      }, {} as Record<string, string>),
      label: "File",
    },
    show: {
      value: false,
      label: "Show",
    },
    rotation: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      label: "Rotation",
    },
    intensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
      label: "Brightness",
    },
  });

  const { followMouse } = useControls("Camera", {
    followMouse: {
      value: 0,
      min: 0,
      max: 50,
      step: 1,
      label: "Follow Mouse",
    },
  });

  useFrame(() => {
    if (followMouse === 0) return;
    camera.position.x =
      cameraInitialPosition.x - mousePos.current.x * followMouse;
    camera.position.y =
      cameraInitialPosition.y - mousePos.current.y * followMouse;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      console.log("Mouse moved", mousePos.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const selectedOption = environmentOptions.find(
    (option) => option.value === environment.file
  ) as EnvironmentOption;

  return (
    <>
      <Stage controls={ref} environment={null} shadows={false}>
        <Model />
        <SceneLight mousePos={mousePos.current} />
        <Environment
          {...(selectedOption.preset
            ? { preset: selectedOption.preset }
            : { files: selectedOption.files })}
          environmentRotation={[0, environment.rotation, 0]}
          environmentIntensity={environment.intensity}
          background={environment.show}
        />
      </Stage>
      <OrbitControls
        ref={ref}
        enablePan={false}
        enableZoom={false}
        enabled={!followMouse}
      />
    </>
  );
}
