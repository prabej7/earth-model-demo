import React from "react";
import { ModelProps } from "@/constants/types/modelProps";
import { useTexture } from "@react-three/drei";
import { Line } from "@react-three/drei";

const Sun: React.FC<ModelProps> = ({ position }) => {
  const [sunTexture] = useTexture(["/textures/sun/8k_sun.jpg"]);

  // Define the planets' positions and radii
  const planets = [
    { name: "Mercury", radius: 1.2*5, color: "gray" },    // 18
    { name: "Venus", radius: 1.8*5.5, color: "orange" },     // 14.4
    { name: "Earth", radius: 2.5*5.5, color: "blue" },       // 10
    { name: "Mars", radius: 3.2*6, color: "red" },         // 9.6
    { name: "Jupiter", radius: 4.2*6, color: "brown" },    // 8.4
    { name: "Saturn", radius: 5.4*6, color: "gold" },    // 8.1
    { name: "Uranus", radius: 7.0*6 , color: "lightblue" }, // 8.4
    { name: "Neptune", radius: 8.0*6, color: "blue" },     // 8.0
    // Add more planets or adjust as needed
  ];
  

  return (
    <group position={position}>
      {/* Sun */}
      <mesh>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={sunTexture} />
      </mesh>

      {/* Orbits */}
      {planets.map((planet) => {
        const segments = 150; // Number of segments for the circle
        const orbitPoints: [number, number, number][] = Array.from({ length: segments + 1 }).map((_, i) => {
          const angle = (i / segments) * 2 * Math.PI;
          return [
            planet.radius * Math.cos(angle),
            0, // Flat orbit on the Y=0 plane
            planet.radius * Math.sin(angle),
          ] as [number, number, number]; // Explicitly cast to the correct tuple type
        });

        return (
          <Line key={planet.name} points={orbitPoints} color={planet.color} lineWidth={1} />
        );
      })}
    </group>
  );
};

export default Sun;
