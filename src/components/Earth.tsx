import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Props {
  position: THREE.Vector3;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const EarthGroup: React.FC<Props> = ({ position, onClick }) => {
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
    <group
      ref={earthGroupRef}
      position={position}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
      onClick={onClick}
    >
      <mesh>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={earthMap}  />
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

const SunGroup: React.FC<Props> = ({ position, onClick }) => {
  const sunGroupRef = useRef<THREE.Group>(null);
  const [sunMap] = useTexture(["/8k_sun.jpg"]) as THREE.Texture[];
  return (
    <group ref={sunGroupRef} position={position} onClick={onClick}>
      <mesh>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={sunMap} />
      </mesh>
    </group>
  );
};

const CameraController: React.FC<{ targetPosition: THREE.Vector3 }> = ({
  targetPosition,
}) => {
  const { camera } = useThree();
  const [isMoving, setIsMoving] = useState(false);

  useFrame(() => {
    if (isMoving) {
      camera.position.lerp(
        targetPosition.clone().setZ(targetPosition.z + 5),
        0.05
      );
      camera.lookAt(targetPosition);

      if (
        camera.position.distanceTo(
          targetPosition.clone().setZ(targetPosition.z + 5)
        ) < 0.1
      ) {
        setIsMoving(false);
      }
    }
  });

  return <></>;
};

const Scene: React.FC<{
  onCameraPosition: THREE.Vector3;
}> = ({ onCameraPosition }) => {
  return (
    <>
      <CameraController targetPosition={onCameraPosition} />
      <directionalLight color="#ffffff" position={[-1, 0.1, 1]} />
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
};

const Model: React.FC = () => {
  const [target, setTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  );
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = (name: string) => {
    setIsMoving(true);
    if (name === "sun") {
      setTarget(new THREE.Vector3(0, 0, -5));
    } else if (name === "earth") {
      setTarget(new THREE.Vector3(0, 0, 0));
    }
  };

  return (
    <div>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 5] }}
        style={{ height: "100vh", backgroundColor: "#000000" }}
      >
        <EarthGroup
          position={new THREE.Vector3(0, 0, 0)}
          onClick={() => handleClick("earth")}
        />
        <SunGroup
          position={new THREE.Vector3(0, 0, -5)}
          onClick={() => handleClick("sun")}
        />
        <OrbitControls />
        <Scene onCameraPosition={target} />
      </Canvas>
    </div>
  );
};

export default Model;
