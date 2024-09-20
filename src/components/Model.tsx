import React from "react";
import { useTexture } from "@react-three/drei";


interface Props {
  texture: string;
  position: [number, number, number];
  args: [number, number];
  name: string;
}

const Model: React.FC<Props> = ({ position, args, texture }) => {
  const [text] = useTexture([texture]);



  return (
    <group>
      
      <mesh position={position}>
        <icosahedronGeometry args={args} />
        <meshStandardMaterial map={text} />
      </mesh>
    </group>
  );
};

export default Model;
