import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import {
  CubeCamera,
  LinearMipmapLinearFilter,
  RGBAFormat,
  WebGLCubeRenderTarget,
  DoubleSide,
  Vector3,
} from 'three';
import * as THREE from 'three';

export const Box = (props: any) => {
  const mesh: any = useRef();
  const [active, setActive] = useState(false);
  const { scene, gl } = useThree();

  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBAFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });

  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);

  useFrame(() => {
    const dir = props.id === 0 ? -0.005 : 0.005;
    mesh.current.rotation.x = mesh.current.position.x += dir;
    cubeCamera.update(gl, scene);
  });

  return (
    <mesh
      position={props.position}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
    >
      <directionalLight intensity={0.5}/>
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        envMap={cubeCamera.renderTarget.texture}
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
};

export const Plane = () => {
  return (
    <mesh position={[0, 0, 0]} scale={[5, 5, 5]} rotation={[0, 0, 0]}>
      <planeBufferGeometry />
      <meshStandardMaterial color={'black'} />
    </mesh>
  );
};

export const Floor = () => {
  return (
    <mesh position={[0, 0, 0]} scale={[2000, 0.1, 2000]}>
      <boxBufferGeometry />
      <meshStandardMaterial color={0x222222} roughness={0} />
    </mesh>
  );
};

export const CustomLight = ({ position }: any) => {
  const mesh: any = useRef();
  const light: any = useRef();

  useFrame(() => {
    mesh.current.scale.x += 0.005;
    mesh.current.rotation.x += 0.001;
    light.current.width = mesh.current.scale.x;
  })

  return (
    <mesh ref={mesh} scale={[30, 30, 1]} rotation={[-1, 0, 0]}>
      <rectAreaLight color={0xFFFFFF} intensity={2} width={30} height={30} ref={light} />
      <planeBufferGeometry />
      <meshStandardMaterial color={0xFFFFFF} side={THREE.DoubleSide} />
    </mesh>
  );
}
