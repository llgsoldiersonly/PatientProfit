import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring, interpolate } from "remotion";
import { C, INTER, SAFE } from "../theme";

const STEPS = [
  { label: "🎯  GOAL",   sub: "Book 10 new patients",    color: C.accent,   delay: 10 },
  { label: "🔍  STEP 1", sub: "Search Google reviews",   color: "#38bdf8",  delay: 24 },
  { label: "📝  STEP 2", sub: "Draft Instagram caption",  color: "#a78bfa",  delay: 38 },
  { label: "📤  STEP 3", sub: "Schedule & publish post",  color: "#f59e0b",  delay: 52 },
  { label: "✅  RESULT", sub: "Task complete — repeat",   color: C.success,  delay: 66 },
];

function stepSpring(frame: number, fps: number, delay: number) {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateX(${interpolate(s, [0, 1], [80, 0])}px)`,
  };
}
function checkmarkStyle(frame: number, fps: number, delay: number) {
  const showAt = delay + 12;
  const f = Math.max(0, frame - showAt);
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(f, [0, 5], [0, 1], { extrapolateRight: "clamp" }),
    transform: `scale(${interpolate(s, [0, 1], [0, 1])})`,
  };
}

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headlineStyle = {
    opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [40, 0])}px)`,
  };
  const stepsCompleted = Math.floor(interpolate(frame, [66, 96], [0, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const counterStyle = { opacity: interpolate(frame, [70, 84], [0, 1], { extrapolateRight: "clamp" }) };
  const stepStyles = STEPS.map((s) => stepSpring(frame, fps, s.delay));
  const checkStyles = STEPS.map((s) => checkmarkStyle(frame, fps, s.delay));
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position:"absolute", top:SAFE.top, bottom:SAFE.bottom, left:SAFE.side, right:SAFE.side, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ ...headlineStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:60, fontWeight:800, color:C.white, lineHeight:1.1 }}>
            <span style={{ color:C.accent }}>Memory</span> &amp; <span style={{ color:C.accentBright }}>Planning</span>
          </div>
        </div>
        <div style={{ flex:1, width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", gap:12 }}>
          {STEPS.map((step, i) => (
            <div key={step.label} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ ...stepStyles[i], flex:1, background:`${step.color}12`, border:`1.5px solid ${step.color}60`, borderRadius:16, padding:"18px 20px", display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontFamily:INTER, fontSize:28, fontWeight:700, color:step.color }}>{step.label}</div>
                <div style={{ fontFamily:INTER, fontSize:24, fontWeight:400, color:C.muted }}>{step.sub}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ ...checkStyles[i], fontSize:28, color:C.success, minWidth:36, textAlign:"center" }}>✓</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ ...counterStyle, textAlign:"center", width:"100%", marginTop:8 }}>
          <div style={{ fontFamily:INTER, fontSize:40, fontWeight:800, color:C.success, fontVariantNumeric:"tabular-nums" }}>
            {stepsCompleted}<span style={{ fontSize:28, color:C.muted, fontWeight:400 }}> / 3 steps completed</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
