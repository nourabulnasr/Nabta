"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MotionValue } from "motion/react";
import { BufferGeometry, Float32BufferAttribute, CatmullRomCurve3, Vector3, type Group } from "three";

function point(t: number, side: number) {
  const width = Math.sin(Math.PI * t) * 0.72;
  return new Vector3(side * width, (t - 0.5) * 3.6,
    Math.sin(Math.PI * t) * (0.28 * (1 - side * side)) + 0.38 * t * t);
}

export function SculptedLeaf({ active, progress, rtl }: {
  active: boolean; progress: MotionValue<number>; rtl: boolean;
}) {
  const group = useRef<Group>(null);
  const viewport = useThree(state => state.viewport);
  const geometry = useMemo(() => {
    const vertices: number[] = [], indices: number[] = [];
    for (let row = 0; row <= 40; row++) for (let col = 0; col <= 12; col++) {
      vertices.push(...point(row / 40, col / 6 - 1).toArray());
    }
    for (let row = 0; row < 40; row++) for (let col = 0; col < 12; col++) {
      const a = row * 13 + col;
      indices.push(a, a + 1, a + 13, a + 1, a + 14, a + 13);
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    result.setIndex(indices);
    result.computeVertexNormals();
    return result;
  }, []);
  const curves = useMemo(() => [-1, 0, 1].map(side => new CatmullRomCurve3(
    Array.from({ length: 41 }, (_, i) => point(i / 40, side)),
  )), []);
  useFrame((_, delta) => {
    if (!group.current || !active) return;
    const scroll = Math.max(0, Math.min(1, progress.get()));
    const blend = 1 - Math.exp(-7 * Math.min(delta, 0.05));
    group.current.rotation.y += (scroll * 1.3 - 0.35 - group.current.rotation.y) * blend;
    group.current.rotation.z += ((rtl ? -1 : 1) * (-0.42 + scroll * 0.3) - group.current.rotation.z) * blend;
  });
  return <group ref={group} position={[(rtl ? -1 : 1) * viewport.width * 0.29, viewport.height * 0.03, 0]}
    scale={Math.min(viewport.height * 0.14, viewport.width * 0.085)} rotation={[0.15, -0.35, rtl ? 0.42 : -0.42]}>
    <mesh geometry={geometry}>
      <meshPhysicalMaterial color="#10263e" metalness={0.65} roughness={0.24} clearcoat={1} side={2} />
    </mesh>
    {curves.map((curve, index) => <mesh key={index}>
      <tubeGeometry args={[curve, 48, index === 1 ? 0.008 : 0.012, 5, false]} />
      <meshStandardMaterial color={index === 2 ? "#a8eb38" : "#39dbe9"}
        emissive={index === 2 ? "#84bc25" : "#179aa8"} emissiveIntensity={0.4} roughness={0.3} />
    </mesh>)}
  </group>;
}
