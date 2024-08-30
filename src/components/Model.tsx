import { OrbitControls, Stars, useTexture, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from "three";

const EarthGroup: React.FC = () => {
  const earthGroupRef = useRef<THREE.Group>(null);
  const [earthMap, nightMap, cloudMap] = useTexture([
    "/earth8k.jpg",
    "/03_earthlights1k.jpg",
    "/05_earthcloudmaptrans.jpg",
  ]) as THREE.Texture[];

  useFrame(() => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={earthGroupRef} rotation={[(-23.4 * Math.PI) / 180, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={earthMap} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.01, 12]} />
        <meshStandardMaterial
          map={nightMap}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.02, 12]} />
        <meshStandardMaterial
          transparent
          map={cloudMap}
          blending={THREE.AdditiveBlending}
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <scene background={new THREE.Color("#000000")}>
        <directionalLight color="#ffffff" position={[-1, 0.1, 1]} />

        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
        />
        <group>
          <Text
            position={[0, 2, 0]}
            fontSize={0.7}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter/static/Inter_18pt-Black.ttf"
            color="#F5F5F5"
          >
            Earth
          </Text>
          <Text
            position={[0, 1.5, 0]}
            maxWidth={5}
            fontSize={0.2}
            font="/fonts/Inter/static/Inter_18pt-Regular.ttf"
            color="#F5F5F5"
          >
            "The Blue Marble"
          </Text>
        </group>
      </scene>
    </>
  );
};

const Model: React.FC = () => {
  return (
    <div>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 5] }}
        style={{ height: "100vh", backgroundColor: "#000000" }}
      >
        <EarthGroup />
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Model;
