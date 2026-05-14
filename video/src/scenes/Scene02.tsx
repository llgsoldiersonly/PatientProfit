import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring, interpolate } from "remotion";
import { C, INTER, SAFE } from "../theme";

const NODES = [
  { id: "PERCEIVE", x: 380, y: 80,  color: "#38bdf8", label: "PERCEIVE" },
  { id: "THINK",   x: 660, y: 310, color: C.accent,  label: "THINK"   },
  { id: "ACT",     x: 660, y: 590, color: C.success,  label: "ACT"     },
  { id: "OBSERVE", x: 100, y: 450, color: "#f59e0b",  label: "OBSERVE" },
];
const ARROWS = [
  { d: "M 440 110 Q 640 130 640 285", from: 0, to: 1 },
  { d: "M 660 370 Q 720 490 700 565", from: 1, to: 2 },
  { d: "M 620 615 Q 300 700 150 495", from: 2, to: 3 },
  { d: "M 105 395 Q 80 160 330 105",  from: 3, to: 0 },
];
const NODE_R = 58;

function drawPath(frame: number, startFrame: number, endFrame: number) {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return interpolate(progress, [0, 1], [800, 0]);
}

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headlineStyle = {
    opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [40, 0])}px)`,
  };
  const copyStyle = { opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: "clamp" }) };
  const nodeDelays = [8, 22, 36, 50];
  const arrowOffsets = [
    drawPath(frame, 18, 34),
    drawPath(frame, 32, 48),
    drawPath(frame, 46, 62),
    drawPath(frame, 60, 76),
  ];
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position:"absolute", top:SAFE.top, bottom:SAFE.bottom, left:SAFE.side, right:SAFE.side, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ ...headlineStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:60, fontWeight:800, color:C.white, lineHeight:1.1 }}>
            The <span style={{ color:C.accent }}>Agent Loop</span>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
          <svg width="800" height="720" viewBox="0 0 800 720" style={{ overflow:"visible" }}>
            <defs>
              {NODES.map((n) => (
                <marker key={n.id} id={`arrow-${n.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={n.color} />
                </marker>
              ))}
            </defs>
            {ARROWS.map((arrow, i) => (
              <path key={i} d={arrow.d} stroke={NODES[arrow.to].color} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="800" strokeDashoffset={arrowOffsets[i]} markerEnd={`url(#arrow-${NODES[arrow.to].id})`} opacity={0.8} />
            ))}
            {NODES.map((node, i) => {
              const s = spring({ frame: Math.max(0, frame - nodeDelays[i]), fps, config: { damping: 200 } });
              const scale = interpolate(s, [0, 1], [0, 1]);
              const opacity = interpolate(Math.max(0, frame - nodeDelays[i]), [0, 6], [0, 1], { extrapolateRight: "clamp" });
              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y}) scale(${scale})`} style={{ transformOrigin:`${node.x}px ${node.y}px` }} opacity={opacity}>
                  <circle cx="0" cy="0" r={NODE_R + 12} fill={`${node.color}18`} />
                  <circle cx="0" cy="0" r={NODE_R} fill="#111" stroke={node.color} strokeWidth="2.5" />
                  <text x="0" y="7" textAnchor="middle" fill={node.color} fontFamily={INTER} fontWeight="800" fontSize="17" letterSpacing="1">{node.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div style={{ ...copyStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:36, fontWeight:400, color:C.muted, lineHeight:1.5 }}>
            Perceive the environment. Think. Act. <span style={{ color:C.white, fontWeight:600 }}>Then do it again.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
