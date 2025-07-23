import { Mesh } from "three";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useRef, useMemo } from "react";

export function Model(props: { compressed: boolean }) {
  const group = useRef(null);
  const { scene } = useGLTF(
    props.compressed ? "/chrome-horse-compressed.glb" : "/chrome-horse.glb"
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Horse"
          geometry={(nodes.Horse as Mesh).geometry}
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
