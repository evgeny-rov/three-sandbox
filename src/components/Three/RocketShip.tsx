import React, { MutableRefObject, useRef, RefObject } from 'react';
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
import RocketShipModel from '../../assets/rocket.glb';

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

  // for (const key in gltf.materials) {
  //   gltf.materials[key].envMap = cubeCamera.renderTarget.texture;
  // }

  useFrame(() => {
    if (group.current) {
      // group.current.position.z += 0.1;
      group.current.rotation.z += 0.005;
    }
    cubeCamera.update(gl, scene);
  });

  console.log(gltf)

  return (
    <group ref={group} scale={[0.5, 0.5, 0.5]}>
      <mesh geometry={gltf.nodes['Cone001_01_-_Default_0'].geometry}>
        <meshStandardMaterial
          envMap={cubeCamera.renderTarget.texture}
          metalness={1}
          roughness={0}
          color={0xffffff}
          envMapIntensity={2}
        />
      </mesh>
      <mesh geometry={gltf.nodes['Cone001_02_-_Default_0'].geometry}>
        <meshStandardMaterial
          envMap={cubeCamera.renderTarget.texture}
          metalness={1}
          roughness={0}
          color={0xffffff}
          envMapIntensity={2}
        />
      </mesh>
      <mesh geometry={gltf.nodes['Cone001_03_-_Default_0'].geometry}>
        <meshStandardMaterial
          envMap={cubeCamera.renderTarget.texture}
          metalness={1}
          roughness={0}
          color={0xffffff}
          envMapIntensity={2}
        />
      </mesh>
      <mesh geometry={gltf.nodes['Cone001_07_-_Default_0'].geometry}>
        <meshStandardMaterial
          envMap={cubeCamera.renderTarget.texture}
          metalness={1}
          roughness={0}
          color={0xffffff}
          envMapIntensity={2}
        />
      </mesh>
      <mesh geometry={gltf.nodes['Cone001_08_-_Default_0'].geometry}>
        <meshStandardMaterial
          opacity={0.1}
          color="blue"
        />
      </mesh>
      <mesh geometry={gltf.nodes['Cone001_09_-_Default_0'].geometry}>
        <meshStandardMaterial
          metalness={1}
          roughness={0.5}
          color={0xffffff}
        />
      </mesh>
    </group>
  );
};
