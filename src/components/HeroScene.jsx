import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { BufferGeometry, DoubleSide, EdgesGeometry, PlaneGeometry, Vector3 } from 'three';

/*
  Hero 3D graphic: wireframe globe with a glowing core, orbiting rings with satellites,
  floating holographic browser panels, and data lines with travelling pulses.
  Loaded lazily (HeroGraphic.jsx) so three.js doesn't block first paint.
*/

function Globe({ c1, c2, reduced }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    if (!reduced) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color={c1} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={c2} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh scale={0.26}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color={c1} transparent opacity={0.9} />
      </mesh>
      <mesh scale={0.42}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color={c1} transparent opacity={0.14} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Ring({ radius, tilt, speed, color, reduced }) {
  const ref = useRef(null);
  useFrame((_, dt) => {
    if (!reduced) ref.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

function Panel({ position, rotation, w, h, color, phase, reduced }) {
  const ref = useRef(null);
  const edges = useMemo(() => new EdgesGeometry(new PlaneGeometry(w, h)), [w, h]);
  useFrame((state) => {
    if (reduced) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9 + phase) * 0.14;
  });
  const bars = [0.7, 0.5, 0.6];
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={color} transparent opacity={0.09} side={DoubleSide} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.9} />
      </lineSegments>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-w / 2 + 0.12 + (bars[i] * w) / 2, h * (0.12 - i * 0.2), 0.01]}>
          <planeGeometry args={[bars[i] * w, 0.05]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
      ))}
      <mesh position={[-w / 2 + 0.12, h / 2 - 0.1, 0.01]}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function DataLine({ to, color, phase, reduced }) {
  const pulse = useRef(null);
  const start = useMemo(() => new Vector3(0, 0, 0), []);
  const end = useMemo(() => new Vector3(...to), [to]);
  const geometry = useMemo(() => new BufferGeometry().setFromPoints([start, end]), [start, end]);
  useFrame((state) => {
    const t = reduced ? phase : (state.clock.elapsedTime * 0.35 + phase) % 1;
    pulse.current.position.lerpVectors(start, end, t);
  });
  return (
    <>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </lineSegments>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
}

const PANELS = [
  { position: [-2.4, 1.3, 0.6], rotation: [0, 0.5, 0.05], w: 1.5, h: 1, phase: 0 },
  { position: [2.5, 0.4, 0.2], rotation: [0, -0.5, -0.04], w: 1.4, h: 0.95, phase: 2 },
  { position: [0.6, -2.1, 1.1], rotation: [-0.2, 0.1, 0], w: 1.3, h: 0.85, phase: 4 },
];

function Rig({ c1, c2, c3, mouse, reduced }) {
  const group = useRef(null);
  useFrame((state) => {
    const g = group.current;
    g.rotation.y += (mouse.x.get() * 0.5 - g.rotation.y) * 0.06;
    g.rotation.x += (mouse.y.get() * 0.3 - g.rotation.x) * 0.06;
    if (!reduced) g.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });
  return (
    <group ref={group}>
      <Globe c1={c1} c2={c2} reduced={reduced} />
      <Ring radius={2.1} tilt={[1.2, 0.2, 0]} speed={0.6} color={c1} reduced={reduced} />
      <Ring radius={2.5} tilt={[0.4, 0.9, 0]} speed={-0.4} color={c2} reduced={reduced} />
      <Ring radius={2.9} tilt={[1.0, -0.7, 0.3]} speed={0.28} color={c3} reduced={reduced} />
      {PANELS.map((p, i) => (
        <Panel key={i} {...p} color={[c1, c2, c3][i]} reduced={reduced} />
      ))}
      {PANELS.map((p, i) => (
        <DataLine key={i} to={p.position} color={[c1, c2, c3][i]} phase={i * 0.33} reduced={reduced} />
      ))}
    </group>
  );
}

export default function HeroScene({ colors, mouse, reduced, active }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <Rig c1={colors[0]} c2={colors[1]} c3={colors[2]} mouse={mouse} reduced={reduced} />
    </Canvas>
  );
}
