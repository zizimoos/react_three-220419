import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSpring, a } from "@react-spring/three";

function Spin({ children }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
    console.log(ref.current.children);
  });
  return <group ref={ref}>{children}</group>;
}

function Cube(props) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { scale, color } = useSpring({
    scale: hovered ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: active ? "hotpink" : props.color,
  });

  return (
    <a.mesh
      {...props}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry></boxGeometry>
      <a.meshBasicMaterial color={color} />
    </a.mesh>
  );
}

function App() {
  return (
    <div
      style={{
        width: "800px",
        height: "800px",
        margin: "0 auto",
        backgroundColor: "black",
      }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[20, 20, 35]} />
        <Spin>
          <Cube position={[0, 0, 0]} color="dodgerblue"></Cube>
        </Spin>
        <Cube position={[1.5, 1, 1]} color="teal"></Cube>
        <Cube position={[-1.5, 1, 1]} color="red"></Cube>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
