import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";

const App = () => {
  const ref = useRef();

  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
      <Stage controls={ref} intensity={1} environment={null} shadows={false}>
        <Model />
        <SceneLight />
        <Environment files={"/THAZERO-WORLD-TEXTURE.hdr"} />
        {/* <Environment preset='city' /> */}
      </Stage>
      <OrbitControls ref={ref} />
    </Canvas>
  );
};

export default App;
