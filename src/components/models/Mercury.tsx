import { ModelProps } from "@/constants/types/modelProps";
import { useTexture } from "@react-three/drei";

const Sun: React.FC<ModelProps> = ({position}) => {
  const [sunTexture] = useTexture(["/sun.jpg"]);
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={sunTexture} />
      </mesh>
    </group>
  );
};

export default Sun;
