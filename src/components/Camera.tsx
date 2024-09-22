import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

interface CameraComponentProps {
  target: THREE.Vector3;
  position: THREE.Vector3;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ target, position }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lerpTarget = useRef(new THREE.Vector3());
  const lerpPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.copy(position);
    }
  }, [position]);

  useFrame(() => {
    if (cameraRef.current) {
      // Smoothly interpolate the camera's position
      lerpPosition.current.lerpVectors(cameraRef.current.position, position, 0.1);
      cameraRef.current.position.copy(lerpPosition.current);

      // Smoothly interpolate the camera's target
      lerpTarget.current.lerpVectors(lerpTarget.current, target, 0.1);
      cameraRef.current.lookAt(lerpTarget.current);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={position} />;
};

export default CameraComponent;
