import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import SolarSystem from "./SolarSystem";

const Home: React.FC = () => {
  return (
    <Canvas
      style={{ backgroundColor: "black", height: "100vh" }}
      camera={{ fov: 75, position: [0, 0, 5] }}
    >
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
      />
      <SolarSystem />
      <OrbitControls />
    </Canvas>
  );
};

export default Home;
