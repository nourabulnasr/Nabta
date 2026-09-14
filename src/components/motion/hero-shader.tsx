"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, useEffect, useMemo, type ReactNode } from "react";

const vertex = `varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`;
const fragment = `precision mediump float;
varying vec2 vUv;
uniform float uTime;
void main(){
  vec2 p=vUv;
  float t=uTime*0.12;
  float wave=0.48+0.16*sin(p.x*4.2+t)+0.07*sin(p.x*8.0-t*0.7);
  float d=abs(p.y-wave);
  float body=exp(-d*10.0);
  float edge=exp(-abs(d-0.075)*95.0);
  float light=0.45+0.55*sin(p.x*3.0+t+0.8);
  vec3 navy=vec3(0.012,0.036,0.082);
  vec3 cyan=vec3(0.02,0.37,0.49);
  vec3 lime=vec3(0.35,0.48,0.08);
  vec3 color=navy+cyan*body*0.24;
  color+=mix(cyan,lime,smoothstep(0.6,1.0,p.x))*edge*light*0.22;
  color*=0.7+0.3*smoothstep(0.0,0.5,p.x);
  gl_FragColor=vec4(color,1.0);
}`;

function Surface({ active, onLost }: { active: boolean; onLost: () => void }) {
  const invalidate = useThree((state) => state.invalidate);
  const canvas = useThree((state) => state.gl.domElement);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, onLost]);
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(invalidate, 1000 / 30);
    return () => clearInterval(timer);
  }, [active, invalidate]);
  useFrame((_, delta) => {
    // GPU uniforms are mutable renderer state, not React state.
    // eslint-disable-next-line react-hooks/immutability
    if (active) uniforms.uTime.value += Math.min(delta, 0.05);
  });
  return <mesh><planeGeometry args={[2, 2]} /><shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthTest={false} depthWrite={false} /></mesh>;
}

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HeroShader({ active, onLost }: { active: boolean; onLost: () => void }) {
  return <ShaderBoundary><Canvas frameloop="demand" dpr={1} gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
    fallback={<span />}><Surface active={active} onLost={onLost} /></Canvas></ShaderBoundary>;
}
