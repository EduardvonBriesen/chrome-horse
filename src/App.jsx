import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Model } from "./Model";
import { SceneLight } from "./SceneLight";

const App = () => {
  const ref = useRef();
  const [env, setEnv] = useState("office-1");
  const [blackAndWhite, setBlackAndWhite] = useState(true);

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
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "white", marginRight: "10px" }}>Background:</label>
          <select value={env} onChange={e => setEnv(e.target.value)} style={{ padding: "5px", borderRadius: "4px" }}>
            {environmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ color: "white", marginRight: "10px" }}>
            <input
              type='checkbox'
              checked={blackAndWhite}
              onChange={e => setBlackAndWhite(e.target.checked)}
              style={{ marginRight: "5px" }}
            />
            Black & White
          </label>
        </div>
      </div>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50 }}
        gl={{
          toneMapping: 0,
          toneMappingExposure: 1,
        }}
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
            <Environment files={`/${env}.hdr`} />
          )}
        </Stage>
        <OrbitControls ref={ref} />
      </Canvas>
    </div>
  );
};

export default App;
