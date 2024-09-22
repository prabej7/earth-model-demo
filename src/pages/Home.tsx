import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import SolarSystem from "./SolarSystem";

const Home: React.FC = () => {
  const controlsRef = useRef<any>(null); // Ref to OrbitControls

  // Handler when an object in the SolarSystem is clicked
  const handleSolarSystemClick = (position: { x: number, y: number, z: number }) => {
    // Convert position to THREE.Vector3
    const targetPosition = new THREE.Vector3(position.x, position.y, position.z);

    // Animate camera and target using GSAP
    gsap.to(controlsRef.current.object.position, {
      x: targetPosition.x + 5, // Example camera position
      y: targetPosition.y + 2,
      z: targetPosition.z + 0,
      duration: 2, // Duration of animation
      ease: "power2.inOut",
      onUpdate: () => controlsRef.current.update(), // Ensure controls are updated
    });

    gsap.to(controlsRef.current.target, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 2, // Duration of animation
      ease: "power2.inOut",
      onUpdate: () => controlsRef.current.update(), // Ensure controls are updated
    });
  };

  return (
    <Canvas style={{ backgroundColor: "black", height: "100vh" }}>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />

      {/* Your SolarSystem component, which sets a new target when clicked */}
      <SolarSystem
        onClick={(position) => handleSolarSystemClick(position)} // Pass position to handler
      />

      {/* OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        enableZoom={true}
        enablePan={false}
      />
    </Canvas>
  );
};

export default Home;
