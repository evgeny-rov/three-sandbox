import React, { Suspense, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import CameraControls from './CameraControls';
import RocketShip from './RocketShip';
import { SkyBox } from './Stage';
import { Box } from './Objects';
import Particles from './Particles';

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

const defaultCameraAngle = [-203, 34, 110];

const Three = () => {
  return (
    <Canvas camera={{ position: [0, -250, -100], up: [0, 0, 1]}}>
      <CameraControls />
      <SkyBox />
      <Particles />
      <Suspense fallback={<Loading />}>
        <RocketShip />
      </Suspense>
    </Canvas>
  );
};

export default Three;
