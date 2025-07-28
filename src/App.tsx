import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { Scene } from "./components/Scene";
import { AsciiRenderer, Loader, Stats } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Bloom, Pixelation } from "@react-three/postprocessing";

function App() {
  const controls = useControls("Effects", {
    blackAndWhite: {
      value: true,
      label: "B&W",
    },
    ascii: {
      value: false,
      label: "ASCII",
    },
    bloom: {
      value: true,
      label: "Bloom",
    },
    pixelation: {
      value: 0,
      min: 0,
      max: 20,
      step: 0.01,
      label: "Pixelation",
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
          <EffectComposer>
            {controls.bloom ? <Bloom luminanceThreshold={0.9} /> : <></>}
            <Pixelation granularity={controls.pixelation} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
