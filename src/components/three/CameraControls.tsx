import React, { useRef } from 'react';
import { extend, useFrame, useThree, ReactThreeFiber } from 'react-three-fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

extend({ OrbitControls });

const CameraControls = () => {
  const { camera, gl: { domElement } } = useThree();
  const controls = useRef<OrbitControls>();

  useFrame(() => {
    controls.current?.update()
  });

  return (
    <orbitControls 
      autoRotate
      autoRotateSpeed={0.3}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

export default CameraControls;