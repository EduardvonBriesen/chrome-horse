import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Model(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/chrome-horse.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <directionalLight
          intensity={100}
          decay={2}
          color='#fffdf4'
          position={[-4.778, 4.051, -0.697]}
          rotation={[1.303, -0.602, 1.21]}
          scale={[-1.66, -0.14, -1]}
          target={nodes.Light.target}
        >
          <primitive object={nodes.Light.target} position={[0, 0, -1]} />
        </directionalLight>
        <mesh
          name='Horse'
          geometry={nodes.Horse.geometry}
          material={materials["Material.001"]}
          position={[-1.672, -0.088, 0.776]}
          rotation={[-0.041, -0.693, -3.042]}
          scale={-0.051}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/chrome-horse.glb");
