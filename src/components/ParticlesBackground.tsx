import { useMemo, useRef } from 'react';
import type { BufferGeometry, Group, Mesh } from 'three';
import type { MotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { effects } from '../data/content';
import { useSettings } from '../context/SettingsContext';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { usePageVisible } from '../hooks/useOnScreen';
import { isSmallScreen } from '../lib/utils';
import ErrorBoundary from './ErrorBoundary';

/*
  Full-page 3D background (Three.js via react-three-fiber):
   - a drifting particle network with lines between nearby points
   - slow wireframe geometric shapes
  The whole scene leans toward the mouse and shifts with scroll.
  NOTE: react context does not cross the <Canvas> boundary, so values are passed as props.
*/

type Mouse = ReturnType<typeof useMousePosition>;

interface NetworkProps {
  count: number;
  pointColor: string;
  lineColor: string;
  mouse: Mouse;
  scroll: MotionValue<number>;
  reduced: boolean;
}

function Network({ count, pointColor, lineColor, mouse, scroll, reduced }: NetworkProps) {
  const group = useRef<Group>(null);
  const pointsGeo = useRef<BufferGeometry>(null);
  const linesGeo = useRef<BufferGeometry>(null);
  const maxLines = count * 4;

  const { positions, velocities, linePositions } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      v[i * 3] = (Math.random() - 0.5) * 0.18;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }
    return { positions: p, velocities: v, linePositions: new Float32Array(maxLines * 6) };
  }, [count, maxLines]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!reduced) {
      for (let i = 0; i < count; i++) {
        const k = i * 3;
        positions[k] += velocities[k] * dt;
        positions[k + 1] += velocities[k + 1] * dt;
        positions[k + 2] += velocities[k + 2] * dt;
        if (Math.abs(positions[k]) > 8) velocities[k] *= -1;
        if (Math.abs(positions[k + 1]) > 5) velocities[k + 1] *= -1;
        if (positions[k + 2] > 3 || positions[k + 2] < -5) velocities[k + 2] *= -1;
      }
    }

    // connect close neighbours
    let n = 0;
    const max2 = 2.4 * 2.4;
    for (let i = 0; i < count && n < maxLines; i++) {
      for (let j = i + 1; j < count && n < maxLines; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < max2) {
          const o = n * 6;
          linePositions[o] = positions[i * 3];
          linePositions[o + 1] = positions[i * 3 + 1];
          linePositions[o + 2] = positions[i * 3 + 2];
          linePositions[o + 3] = positions[j * 3];
          linePositions[o + 4] = positions[j * 3 + 1];
          linePositions[o + 5] = positions[j * 3 + 2];
          n++;
        }
      }
    }
    const lines = linesGeo.current;
    const points = pointsGeo.current;
    if (!lines || !points) return;
    lines.setDrawRange(0, n * 2);
    lines.attributes.position.needsUpdate = true;
    points.attributes.position.needsUpdate = true;

    // ease the whole group toward mouse + scroll
    const s = scroll.get();
    const g = group.current;
    if (!g) return;
    g.rotation.y += (mouse.x.get() * 0.25 + s * 1.4 - g.rotation.y) * 0.05;
    g.rotation.x += (mouse.y.get() * 0.15 + s * 0.4 - g.rotation.x) * 0.05;
    g.position.y += (s * 2.5 - g.position.y) * 0.05;
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        {/* fixed pixel size: points never balloon into big squares when close to the camera */}
        <pointsMaterial color={pointColor} size={2.5} sizeAttenuation={false} transparent opacity={0.9} depthWrite={false} />
      </points>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

type ShapeDef = { kind: 'ico' | 'oct' | 'torus'; pos: [number, number, number]; scale: number; color: number };

const SHAPES: ShapeDef[] = [
  { kind: 'ico', pos: [-5.2, 2.2, -3], scale: 1.1, color: 0 },
  { kind: 'oct', pos: [5.6, -1.6, -2.5], scale: 1.3, color: 1 },
  { kind: 'torus', pos: [3.2, 3.2, -5], scale: 0.9, color: 2 },
  { kind: 'ico', pos: [-4.4, -3.2, -4], scale: 0.7, color: 1 },
];

function Shapes({ colors, reduced }: { colors: string[]; reduced: boolean }) {
  const refs = useRef<(Mesh | null)[]>([]);
  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x += delta * 0.12 * (i + 1);
      m.rotation.y += delta * 0.18;
      m.position.y = SHAPES[i].pos[1] + Math.sin(t * 0.5 + i * 1.7) * 0.4;
    });
  });

  return SHAPES.map((s, i) => (
    <mesh key={i} ref={(el) => {
        refs.current[i] = el;
      }} position={s.pos} scale={s.scale}>
      {s.kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {s.kind === 'oct' && <octahedronGeometry args={[1, 0]} />}
      {s.kind === 'torus' && <torusGeometry args={[1, 0.28, 10, 32]} />}
      <meshBasicMaterial color={colors[s.color]} wireframe transparent opacity={0.28} />
    </mesh>
  ));
}

export default function ParticlesBackground() {
  const { reduced, theme, lite } = useSettings();
  const pageVisible = usePageVisible();
  const mouse = useMousePosition();
  const { progress } = useScrollProgress();
  // fewer particles on phones / low-core devices
  const count = useMemo(() => {
    const low = isSmallScreen() || (navigator.hardwareConcurrency || 8) <= 4;
    return low || lite ? Math.min(effects.particles.mobile, lite ? 40 : 999) : effects.particles.desktop;
  }, [lite]);

  const frameloop = !pageVisible ? 'never' : reduced ? 'demand' : 'always';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <ErrorBoundary>
        <Canvas
          dpr={lite ? 1 : [1, 1.5]}
          camera={{ position: [0, 0, 7], fov: 55 }}
          frameloop={frameloop}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <Network
            count={count}
            pointColor={theme.c1}
            lineColor={theme.c2}
            mouse={mouse}
            scroll={progress}
            reduced={reduced}
          />
          {/* big wireframe shapes would sit behind text on phones: desktop only */}
          {!isSmallScreen() && !lite && <Shapes colors={[theme.c1, theme.c2, theme.c3]} reduced={reduced} />}
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
