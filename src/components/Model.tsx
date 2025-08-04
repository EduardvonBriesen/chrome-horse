import { Group, Mesh, type Object3DEventMap } from "three";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useRef, useMemo } from "react";
import { useControls } from "leva";

export function Model() {
  const group = useRef<Group<Object3DEventMap>>(null);

  const { compressed, spin } = useControls("Model", {
    compressed: {
      value: true,
      label: "Compressed",
    },
    spin: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.01,
      label: "Spin",
    },
  });
  const { scene } = useGLTF(
    compressed ? "/chrome-horse-compressed.glb" : "/chrome-horse.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  useFrame((state) => {
    if (spin === 0 || !group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * spin;
  });

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <mesh
          name="Horse"
          geometry={(nodes.Horse as Mesh).geometry}
          material={materials["Material.001"]}
          position={[-2.5, 0, 0.8]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/chrome-horse.glb");
