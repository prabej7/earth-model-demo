import  { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCamera(): JSX.Element {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const t = clock.getElapsedTime();
      cameraRef.current.position.x = Math.sin(t) * 5;
      cameraRef.current.position.z = Math.cos(t) * 5;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} />;
}

function Scene(): JSX.Element {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Test(): JSX.Element {
  return (
    <Canvas>
      <AnimatedCamera />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Scene />
    </Canvas>
  );
}