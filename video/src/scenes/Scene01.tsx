import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring, interpolate } from "remotion";
import { C, INTER, SAFE } from "../theme";

function useSpringIn(delay = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
    transform: `scale(${interpolate(s, [0, 1], [0.85, 1])}) translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
  };
}

const ChatbotSVG: React.FC = () => (
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
    <rect x="20" y="20" width="140" height="90" rx="14" fill="#1e1e1e" stroke="#333" strokeWidth="2" />
    <rect x="38" y="44" width="80" height="9" rx="4" fill="#444" />
    <rect x="38" y="61" width="60" height="9" rx="4" fill="#333" />
    <rect x="38" y="78" width="70" height="9" rx="4" fill="#3a3a3a" />
    <path d="M 40 110 L 28 128 L 60 110 Z" fill="#1e1e1e" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
    <line x1="90" y1="140" x2="90" y2="165" stroke="#555" strokeWidth="3" strokeLinecap="round" />
    <polyline points="82,157 90,166 98,157" stroke="#555" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const AgentSVG: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: "clamp" });
  const glow = Math.sin(frame * 0.15) * 0.5 + 0.5;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="85" r="55" fill={`${C.accent}${Math.round(interpolate(glow,[0,1],[15,30])).toString(16).padStart(2,'0')}`} />
      <polygon points="90,32 136,58 136,112 90,138 44,112 44,58" fill="#1a1a2e" stroke={C.accent} strokeWidth="2.5" />
      <text x="90" y="92" textAnchor="middle" fill={C.accent} fontFamily={INTER} fontWeight="800" fontSize="18" letterSpacing="1">AI</text>
      <g transform={`rotate(${rotation}, 90, 85)`}>
        <circle cx="90" cy="30" r="5" fill={C.accentBright} />
      </g>
      <path d="M 148 85 A 58 58 0 1 1 90 27" stroke={C.accentBright} strokeWidth="3" strokeLinecap="round" fill="none" />
      <polyline points="86,20 90,28 98,22" stroke={C.accentBright} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

export const Scene01: React.FC = () => {
  const headlineStyle = useSpringIn(0);
  const leftStyle = useSpringIn(10);
  const rightStyle = useSpringIn(22);
  const copyStyle = useSpringIn(36);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position:"absolute", top:SAFE.top, bottom:SAFE.bottom, left:SAFE.side, right:SAFE.side, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ ...headlineStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:64, fontWeight:800, color:C.white, lineHeight:1.1 }}>
            What Is an <span style={{ color:C.accent }}>AI Agent?</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:24, width:"100%", flex:1, alignItems:"center", justifyContent:"center", marginTop:40, marginBottom:40 }}>
          <div style={{ ...leftStyle, flex:1, background:C.card, border:`1px solid ${C.cardBorder}`, borderRadius:24, padding:"32px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <ChatbotSVG />
            <div style={{ fontFamily:INTER, fontSize:28, fontWeight:700, color:C.muted }}>Chatbot</div>
            <div style={{ fontFamily:INTER, fontSize:24, fontWeight:400, color:C.muted, textAlign:"center", lineHeight:1.4 }}>Waits for commands</div>
          </div>
          <div style={{ fontFamily:INTER, fontSize:28, fontWeight:800, color:C.muted }}>VS</div>
          <div style={{ ...rightStyle, flex:1, background:"#0d0d1f", border:`1.5px solid ${C.accent}`, borderRadius:24, padding:"32px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16, boxShadow:`0 0 32px ${C.accent}30` }}>
            <AgentSVG />
            <div style={{ fontFamily:INTER, fontSize:28, fontWeight:700, color:C.accent }}>Agent</div>
            <div style={{ fontFamily:INTER, fontSize:24, fontWeight:400, color:C.white, textAlign:"center", lineHeight:1.4 }}>Acts autonomously</div>
          </div>
        </div>
        <div style={{ ...copyStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:36, fontWeight:400, color:C.muted, lineHeight:1.5 }}>
            A chatbot responds. An agent <span style={{ color:C.white, fontWeight:600 }}>thinks, plans, and acts</span> on its own.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
