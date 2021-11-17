import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Object3D } from 'three';

const getNextPos = () => {
  const x = Math.floor((Math.random() - 0.5) * 400);
  const y = Math.floor((Math.random() - 0.5) * 400);
  const z = Math.floor(Math.random() * 400) + 200;
  return [x, y, z];
}

const MovingParticle = () => {
  const meshRef = useRef<Object3D>();
  const speed = (Math.random() * 20) + 5;
  
  useFrame(() => {
    const particle = meshRef.current;
    if (!particle) return;

    if (particle.position.z < -200) {
      const [x, y, z] = getNextPos();
      particle.position.x = x;
      particle.position.y = y;
      particle.position.z = z;
    }
    particle.position.z -= speed;
  })

  const [x, y, z] = getNextPos();

  return (
    <mesh ref={meshRef} position={[x, y, z]} scale={[0.5, 0.5, 0.5]}>
      <boxBufferGeometry />
      <meshBasicMaterial />
    </mesh>
  );
};

export default MovingParticle;