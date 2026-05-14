import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring, interpolate } from "remotion";
import { C, INTER, SAFE } from "../theme";

const TOOLS = [
  { label: "Web Search", emoji: "🔍", x: 380, y: 60,  delay: 18, lineEnd: [380, 130] },
  { label: "Code Exec",  emoji: "💻", x: 660, y: 310, delay: 30, lineEnd: [620, 290] },
  { label: "File Access",emoji: "📁", x: 380, y: 560, delay: 42, lineEnd: [380, 490] },
  { label: "APIs",       emoji: "🌐", x: 100, y: 310, delay: 54, lineEnd: [160, 310] },
];
const CENTER = { x: 380, y: 310 };
const TOOL_R = 70;

function springIn(frame: number, fps: number, delay = 0) {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    scale: interpolate(s, [0, 1], [0, 1]),
  };
}
function lineProgress(frame: number, delay: number) {
  return interpolate(frame, [delay, delay + 16], [800, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headlineStyle = {
    opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [40, 0])}px)`,
  };
  const centerS = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 200 } });
  const centerScale = interpolate(centerS, [0, 1], [0, 1]);
  const toolStyles = TOOLS.map((t) => springIn(frame, fps, t.delay));
  const lineOffsets = TOOLS.map((t) => lineProgress(frame, t.delay - 6));
  const activateProgress = TOOLS.map((t) => interpolate(frame, [t.delay + 10, t.delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position:"absolute", top:SAFE.top, bottom:SAFE.bottom, left:SAFE.side, right:SAFE.side, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ ...headlineStyle, textAlign:"center" }}>
          <div style={{ fontFamily:INTER, fontSize:64, fontWeight:800, color:C.white, lineHeight:1.1 }}>
            Agents Use <span style={{ color:C.accent }}>Tools</span>
          </div>
        </div>
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
          <svg width="800" height="660" viewBox="0 0 760 640" style={{ overflow:"visible" }}>
            {TOOLS.map((tool, i) => (
              <line key={tool.label} x1={CENTER.x} y1={CENTER.y} x2={tool.lineEnd[0]} y2={tool.lineEnd[1]} stroke={activateProgress[i] > 0.5 ? C.success : C.accent} strokeWidth="2" strokeDasharray="800" strokeDashoffset={lineOffsets[i]} strokeLinecap="round" opacity={0.7} />
            ))}
            <g transform={`translate(${CENTER.x}, ${CENTER.y}) scale(${centerScale})`}>
              <circle cx="0" cy="0" r="62" fill={`${C.accent}25`} />
              <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="#0d0d1f" stroke={C.accent} strokeWidth="2.5" />
              <text x="0" y="-6" textAnchor="middle" fill={C.white} fontFamily={INTER} fontWeight="800" fontSize="14">AGENT</text>
              <text x="0" y="14" textAnchor="middle" fill={C.accentBright} fontFamily={INTER} fontWeight="400" fontSize="12">CORE</text>
            </g>
            {TOOLS.map((tool, i) => {
              const { opacity, scale } = toolStyles[i];
              const isActive = activateProgress[i] > 0.5;
              const borderColor = isActive ? C.success : C.accent;
              return (
                <g key={tool.label} transform={`translate(${tool.x}, ${tool.y}) scale(${scale})`} opacity={opacity}>
                  <circle cx="0" cy="0" r={TOOL_R + 8} fill={isActive ? `${C.success}18` : `${C.accent}18`} />
                  <circle cx="0" cy="0" r={TOOL_R} fill="#111" stroke={borderColor} strokeWidth="2" />
                  <text x="0" y="-10" textAnchor="middle" fontSize="32">{tool.emoji}</text>
                  <text x="0" y="22" textAnchor="middle" fill={isActive ? C.success : C.white} fontFamily={INTER} fontWeight="600" fontSize="15">{tool.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div style={{ opacity: interpolate(frame, [65, 80], [0, 1], { extrapolateRight: "clamp" }), textAlign:"center" }}>
          <div style={{ fontFamily:INTER, fontSize:36, fontWeight:400, color:C.muted, lineHeight:1.5 }}>
            Real-world tools transform an agent from a <span style={{ color:C.white, fontWeight:600 }}>talker into a doer.</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
