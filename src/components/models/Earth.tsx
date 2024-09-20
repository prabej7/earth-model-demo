import { ModelProps } from "@/constants/types/modelProps";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const EarthMesh: React.FC<ModelProps> = ({ position }) => {
  const earthRef = useRef<THREE.Group>(null);
  const [earthDay, earthNight, earthCloud, earthSpec] = useTexture([
    "/textures/earth/earth8k.jpg",
    "/textures/earth/03_earthlights1k.jpg",
    "/textures/earth/01_earthbump1k.jpg",
    "/textures/earth/02_earthspec1k.jpg",
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.004;
    }
  });
  return (
    <group ref={earthRef} rotation={[0.41, 0, 0]} position={position}>
      <mesh>
        <icosahedronGeometry args={[1, 16]} />
        <meshStandardMaterial map={earthDay} flatShading />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.01, 16]} />
        <meshStandardMaterial
          map={earthNight}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.02, 16]} />
        <meshStandardMaterial
          map={earthCloud}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.02, 16]} />
        <meshStandardMaterial
          map={earthSpec}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.04}
        />
      </mesh>
    </group>
  );
};

export default EarthMesh;
