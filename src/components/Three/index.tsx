import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { TextureLoader, sRGBEncoding, EquirectangularReflectionMapping } from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import CameraControls from './CameraControls';
import { Box, Plane, Floor, CustomLight } from './Objects';
import { SkyBox } from './Stage';

RectAreaLightUniformsLib.init();

const Three = () => {
  return (
    <Canvas camera={{ position: [20, 20, -40] }}>
      <CameraControls />
      <CustomLight position={[0, 5, 0]}/>
      <Floor />
      <ambientLight intensity={3}/>
    </Canvas>
  );
};

export default Three;
