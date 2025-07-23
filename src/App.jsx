import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Scene } from "./components/Scene";

const App = () => {
  const controls = useControls({
    blackAndWhite: {
      value: true,
      label: "B&W",
    },
  });

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50 }}
        style={{
          filter: controls.blackAndWhite ? "grayscale(100%)" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
export default App;
