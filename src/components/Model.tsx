import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export interface Position {
  x: number;
  y: number;
  z: number;
}

interface Props {
  texture: string;
  position: [number, number, number];
  args: [number, number];
  name: string;
  onClick: (position: Position) => void;
}

const Model: React.FC<Props> = ({ position, args, texture, onClick }) => {
  const [text] = useTexture([texture]);
  const meshRef = useRef<THREE.Mesh>(null); 

  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; 
    }
  });

  return (
    <group
      onClick={(e) => {
        onClick(e.point);
      }}
    >
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={args} />
        <meshStandardMaterial map={text} />
      </mesh>
    </group>
  );
};

export default Model;
