import { ModelProps } from "@/constants/types/modelProps";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader, LWOLoader } from "three-stdlib";
import { Text } from "@react-three/drei";

const EarthMesh: React.FC<ModelProps> = ({ position, onClick }) => {
  const earthRef = useRef<THREE.Group>(null);
  const textRefs = useRef<(THREE.Mesh | null)[]>([]);

  const [earthDay, earthNight, earthCloud, earthSpec, moonTexture] = useTexture(
    [
      "/textures/earth/earth8k.jpg",
      "/textures/earth/03_earthlights1k.jpg",
      "/textures/earth/01_earthbump1k.jpg",
      "/textures/earth/02_earthspec1k.jpg",
      "/textures/moon/moon.jpg", // Moon texture
    ]
  );

  // Load satellite models
  const [GOES] = useLoader(LWOLoader, ["/models/GOES-PQR.lwo"]);
  const [gltf, hubleglt, tera] = useLoader(GLTFLoader, [
    "/models/ISS_stationary.glb",
    "/models/Hubble.glb",
    "/models/Terra.glb",
  ]);

  // Update text orientation to face the camera
  useFrame(({ camera }) => {
    textRefs.current.forEach((textMesh) => {
      if (textMesh) {
        textMesh.lookAt(camera.position);
      }
    });
  });

  return (
    <group
      ref={earthRef}
      rotation={[0.41, 0, 0]}
      position={position}
      onClick={(e) => onClick(e.point)}
    >
      {/* Earth Text */}
      <mesh>
        <Text
          ref={(el) => (textRefs.current[0] = el)} // Update the index for Earth
          scale={[0.5, 0.5, 0.5]}
          position={[0, 2, 0]}
          color="white"
        >
          Earth
        </Text>
        <icosahedronGeometry args={[1, 16]} />{" "}
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
      <mesh position={[3, 0, 0]} scale={[0.272, 0.272, 0.272]}>
        <Text
          ref={(el) => (textRefs.current[1] = el)} // Update the index for Moon
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0.5, 0]}
          color="white"
        >
          Moon
        </Text>
        <sphereGeometry args={[0.272, 16, 16]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>

      {/* ISS Model */}
      <group position={[1.8, 0.8, 0]}>
        <Text
          ref={(el) => (textRefs.current[2] = el)} // Update the index for ISS
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.25, 0]}
          color="white"
        >
          International Space Station
        </Text>
        <primitive object={gltf.scene} scale={[0.002, 0.002, 0.002]} />
      </group>

      {/* Hubble Space Telescope */}
      <group position={[3.5, 1.5, 0.5]}>
        <Text
          ref={(el) => (textRefs.current[3] = el)} // Update the index for Hubble
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.3, 0]}
          color="white"
        >
          Hubble Space Telescope
        </Text>
        <primitive object={hubleglt.scene} scale={[0.01, 0.01, 0.01]} />
      </group>

      {/* Terra Satellite */}
      <group position={[4, 2.5, -0.5]}>
        <Text
          ref={(el) => (textRefs.current[4] = el)} // Update the index for Terra
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.25, 0]}
          color="white"
        >
          Terra Satellite
        </Text>
        <primitive object={tera.scene} scale={[0.00001, 0.00001, 0.00001]} />
      </group>

      {/* GOES Satellite */}
      <group position={[2.5, 1.8, -1]}>
        <Text
          ref={(el) => (textRefs.current[5] = el)} // Update the index for GOES
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.25, 0]}
          color="white"
        >
          GOES Satellite
        </Text>
        <primitive object={GOES} scale={[0.01, 0.01, 0.01]} />
      </group>
    </group>
  );
};

export default EarthMesh;
