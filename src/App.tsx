import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Scene } from "./components/Scene";
import { AsciiRenderer, Loader, Stats } from "@react-three/drei";
import { Suspense } from "react";

function App() {
  const controls = useControls({
    blackAndWhite: {
      value: true,
      label: "B&W",
    },
    ascii: {
      value: false,
      label: "ASCII",
    },
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 100], fov: 60 }}
        style={{
          filter: controls.blackAndWhite ? "grayscale(100%)" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          {controls.ascii && <AsciiRenderer invert={false} resolution={0.1} />}
          <Scene />
          <Stats />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
