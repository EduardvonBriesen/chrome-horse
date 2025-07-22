import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";

const App = () => {
  const ref = useRef();

  const { env, blackAndWhite } = useControls({
    env: {
      value: "office-1",
      options: {
        "Office 1": "office-1",
        "Office 2": "office-2",
        "Texture 1": "texture-1",
        "Studio": "studio",
        "Sunset": "sunset",
        "Dawn": "dawn",
        "Night": "night",
        "Warehouse": "warehouse",
      },
    },
    blackAndWhite: true,
  });
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

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50 }}
        style={{
          filter: blackAndWhite ? "grayscale(100%)" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <Stage controls={ref} intensity={1} environment={null} shadows={false}>
          <Model />
          <SceneLight />
          {environmentOptions.find(option => option.value === env)?.preset ? (
            <Environment preset={env} />
          ) : (
            <Environment files={`/${env}.hdr`} environmentRotation={[0, Math.PI / 2, 0]} />
          )}
        </Stage>
        <OrbitControls ref={ref} />
      </Canvas>
    </div>
  );
};

export default App;
