import React, { Suspense } from "react";
import { Canvas, ReactThreeFiber } from "react-three-fiber";
import CameraControls from "../../components/three/CameraControls";
import RocketShip from "./RocketShip";
import { SkyBox } from "./Stage";
import ParticleCluster from "./ParticleCluster";

const Loading = () => {
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
}

const preferedCameraPos = [-203, 34, 110] as ReactThreeFiber.Vector3;

const RocketScene = () => {
  return (
    <Canvas camera={{ position: preferedCameraPos, up: [0, 0, 1] }}>
      <CameraControls />
      <SkyBox />
      <ParticleCluster />
      <Suspense fallback={<Loading />}>
        <RocketShip />
      </Suspense>
    </Canvas>
  );
};

export default RocketScene;
