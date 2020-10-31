import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import {
  CubeCamera,
  LinearMipmapLinearFilter,
  Object3D,
  RGBAFormat,
  WebGLCubeRenderTarget,
} from 'three';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import RocketShipModel from '../../assets/rocket_model.glb';

export default () => {
  const group = useRef<Object3D>(null);
  const { scene, gl } = useThree();
  const gltf: any = useLoader(GLTFLoader, RocketShipModel);

  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBAFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });

  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);

  useFrame(() => {
    if (group.current) {
      const [, flames] = group.current.children;
      group.current.rotation.z += 0.005;
      flames.position.z =
        flames.position.z > 0 ? -(Math.random() * 5) : Math.random() * 5;
    }
    cubeCamera.update(gl, scene);
  });

  return (
    <group ref={group} scale={[0.5, 0.5, 0.5]}>
      <mesh geometry={gltf.nodes['Body'].geometry}>
        <meshStandardMaterial
          envMap={cubeCamera.renderTarget.texture}
          metalness={1}
          roughness={0}
          color={0xffffff}
          envMapIntensity={2}
        />
      </mesh>
      <mesh geometry={gltf.nodes['Flames'].geometry}>
        <meshBasicMaterial color={0xcc0055} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};
