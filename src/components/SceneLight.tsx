import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { DirectionalLight, Vector3 } from "three";

export function SceneLight() {
  const light = useRef<DirectionalLight>(null); // Reference for the light
  const lightMesh = useRef<DirectionalLight>(null); // Reference for the light's visual representation (a small sphere)
  const { camera } = useThree();
  const mousePos = useRef(new Vector3(0, 0, 0)); // Mouse position in normalized device coordinates

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (light.current) {
      // Map mouse coordinates to a 2D plane positioned between the camera and the subject
      const distanceFromCamera = 100; // The plane's distance from the camera
      const lightPosition = new Vector3(
        mousePos.current.x * distanceFromCamera,
        mousePos.current.y * distanceFromCamera,
        0
      );

      // Transform the 2D plane coordinates to the camera's local space
      lightPosition.unproject(camera);

      // Set the light's position
      light.current.position.copy(lightPosition);

      // Update the red sphere (visual representation of the light's position)
      if (lightMesh.current) {
        lightMesh.current.position.copy(light.current.position);
      }

      // Make the light look at the subject at position [0, 0, 0]
      light.current.target.position.set(0, 0, 0);
      light.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Directional Light */}
      <directionalLight
        ref={light}
        castShadow
        intensity={1.5}
        position={[0, 0, 5]} // Default position
      >
        <object3D ref={light.current?.target} position={[0, 0, 0]} />
      </directionalLight>

      {/* Visual representation of the light */}
      {/* <mesh ref={lightMesh}>
        <sphereBufferGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color='red' />
      </mesh> */}
    </>
  );
}
