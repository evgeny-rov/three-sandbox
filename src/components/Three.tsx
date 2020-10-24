import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

const Box = (props: any) => {
  const mesh: any = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    const dir = props.id === 0 ? -0.005 : 0.005;
    mesh.current.rotation.x = mesh.current.rotation.y += dir;
  });

  return (
    <mesh
      position={props.position}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} />
    </mesh>
  );
};

const Plane = () => {
  return (
    <mesh position={[0, 0, -2]} scale={[10, 10, 10]} rotation={[-1, 0, 0]}>
      <planeBufferGeometry />
      <meshStandardMaterial color={'black'} />
    </mesh>
  );
};

const Three = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Plane />
      <Box position={[-1.2, 0, 0]} id={0} />
      <Box position={[1.2, 0, 0]} id={1} />
    </Canvas>
  );
};

export default Three;
