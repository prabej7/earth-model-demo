import Model from "@/components/Model";
import { Earth, Sun } from "@/components/models";
import React from "react";

const SolarSystem: React.FC = () => {
  // Define the planets' positions and radii again here
  const planets = [
    { name: "Mercury", radius: 1.2 * 5, texture: "/textures/mercury/mercury.jpg" },
    { name: "Venus", radius: 1.8 * 5.5, texture: "/textures/venus/venus.jpg" },
    // { name: "Earth", radius: 2.5 * 5.5, texture: "/textures/earth/earth.jpg" },
    // { name: "Mars", radius: 3.2 * 6, texture: "/textures/mars/mars.jpg" },
    // { name: "Jupiter", radius: 4.2 * 6, texture: "/textures/jupiter/jupiter.jpg" },
    // { name: "Saturn", radius: 5.4 * 6, texture: "/textures/saturn/saturn.jpg" },
    // { name: "Uranus", radius: 7.0 * 6, texture: "/textures/uranus/uranus.jpg" },
    // { name: "Neptune", radius: 8.0 * 6, texture: "/textures/neptune/neptune.jpg" },
  ];

  return (
    <>
      {/* Sun */}
      <Sun position={[0, 0, 0]} />

      {/* Planets */}
      {planets.map((planet, index) => {
        const angle = (index / planets.length) * 2 * Math.PI; // Spread planets evenly around the Sun
        const x = planet.radius * Math.cos(angle);
        const z = planet.radius * Math.sin(angle);

        return (
          <Model
            key={planet.name}
            name={planet.name}
            texture={planet.texture}
            args={[1, 12]}
            position={[x, 0, z]} // Set the calculated position
          />
        );
      })}

      {/* Earth specific instance */}
      <Earth position={[2.5 * 5.5 * Math.cos((2 / planets.length) * 2 * Math.PI), 0, 2.5 * 5.5 * Math.sin((2 / planets.length) * 2 * Math.PI)]} />

      <pointLight position={[0, 0, 5]} intensity={2} distance={200} decay={2} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
    </>
  );
};

export default SolarSystem;
