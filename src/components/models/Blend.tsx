import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

const GLTFModel: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "models/Earth/Sun.glb");
  return <primitive object={gltf.scene} scale={0.01} />;
};

export default GLTFModel;
