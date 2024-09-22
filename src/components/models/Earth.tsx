import { ModelProps } from "@/constants/types/modelProps";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

const EarthMesh: React.FC<ModelProps> = ({ position, onClick }) => {
  const earthRef = useRef<THREE.Group>(null);
  const [earthDay, earthNight, earthCloud, earthSpec, moonTexture] = useTexture(
    [
      "/textures/earth/earth8k.jpg",
      "/textures/earth/03_earthlights1k.jpg",
      "/textures/earth/01_earthbump1k.jpg",
      "/textures/earth/02_earthspec1k.jpg",
      "/textures/moon/moon.jpg", // Moon texture
    ]
  );

  // Load the ISS model
  const gltf = useLoader(GLTFLoader, "/models/ISS_stationary.glb");

  // useFrame(() => {
  //   if (earthRef.current) {
  //     earthRef.current.rotation.y += 0.004; // Rotate the Earth
  //   }
  // });

  return (
    <group
      ref={earthRef}
      rotation={[0.41, 0, 0]}
      position={position}
      onClick={(e) => onClick(e.point)}
    >
      {/* Earth Meshes */}
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

      {/* Moon Mesh */}
      <mesh position={[1.5, 0, 0]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[0.27, 16, 16]} /> {/* Moon geometry */}
        <meshStandardMaterial map={moonTexture} />
      </mesh>

      {/* ISS Model */}
      <primitive
        object={gltf.scene}
        position={[2, 1, 0]} // Adjust the position of the ISS model
        scale={[0.005, 0.005, 0.01]} // Scale the ISS model as needed
      />
    </group>
  );
};

export default EarthMesh;
