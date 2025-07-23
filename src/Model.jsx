import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Model(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF(props.compressed ? "/chrome-horse-compressed.glb" : "/chrome-horse.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='Horse'
          geometry={nodes.Horse.geometry}
          material={materials["Material.001"]}
          position={[0, 0, 0]}
          rotation={[0, 1, 0]}
          scale={1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/chrome-horse.glb");
