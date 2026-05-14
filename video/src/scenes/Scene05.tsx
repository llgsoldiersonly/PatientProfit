import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring, interpolate } from "remotion";
import { C, INTER, SAFE } from "../theme";

const PARTICLES = [
  { x: 0.12, size: 14, delay: 0,  drift: 18  },
  { x: 0.25, size: 8,  delay: 6,  drift: -12 },
  { x: 0.38, size: 18, delay: 3,  drift: 8   },
  { x: 0.50, size: 10, delay: 10, drift: -20 },
  { x: 0.62, size: 16, delay: 2,  drift: 14  },
  { x: 0.75, size: 7,  delay: 8,  drift: -8  },
  { x: 0.88, size: 12, delay: 5,  drift: 22  },
  { x: 0.18, size: 9,  delay: 14, drift: -16 },
  { x: 0.44, size: 15, delay: 1,  drift: 10  },
  { x: 0.68, size: 6,  delay: 12, drift: -24 },
  { x: 0.82, size: 11, delay: 7,  drift: 16  },
  { x: 0.32, size: 13, delay: 4,  drift: -6  },
];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const headlineS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } });
  const headlineStyle = {
    opacity: interpolate(Math.max(0, frame - 10), [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(headlineS, [0, 1], [50, 0])}px)`,
  };
  const statS = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 200 } });
  const statStyle = {
    opacity: interpolate(Math.max(0, frame - 35), [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `scale(${interpolate(statS, [0, 1], [0.7, 1])})`,
  };
  const count = Math.floor(interpolate(frame, [40, 90], [0, 1000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const ctaStyle = { opacity: interpolate(frame, [100, 118], [0, 1], { extrapolateRight: "clamp" }) };
  const subS = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 200 } });
  const subStyle = {
    opacity: interpolate(Math.max(0, frame - 80), [0, 8], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(subS, [0, 1], [30, 0])}px)`,
  };
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      {PARTICLES.map((p, i) => {
        const f = Math.max(0, frame - p.delay);
        const baseY = height + 40;
        const travel = interpolate(f, [0, 160], [0, height + 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const opacity = interpolate(f, [0, 12, 130, 160], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const cx = width * p.x + interpolate(f, [0, 160], [0, p.drift], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const cy = baseY - travel;
        return (
          <div key={i} style={{ position:"absolute", left:cx - p.size/2, top:cy - p.size/2, width:p.size, height:p.size, borderRadius:"50%", background:C.accent, opacity, boxShadow:`0 0 ${p.size*2}px ${C.accent}80` }} />
        );
      })}
      <div style={{ position:"absolute", top:SAFE.top, bottom:SAFE.bottom, left:SAFE.side, right:SAFE.side, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ ...headlineStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:64, fontWeight:800, color:C.white, lineHeight:1.1 }}>
            The Future Runs on <span style={{ color:C.accent }}>Agents</span>
          </div>
        </div>
        <div style={{ ...statStyle, textAlign:"center" }}>
          <div style={{ fontFamily:INTER, fontSize:120, fontWeight:800, color:C.accent, lineHeight:1, fontVariantNumeric:"tabular-nums", textShadow:`0 0 60px ${C.accent}60` }}>
            {count.toLocaleString()}<span style={{ fontSize:56, color:C.accentBright }}>+</span>
          </div>
          <div style={{ fontFamily:INTER, fontSize:36, fontWeight:400, color:C.muted, marginTop:8 }}>tasks automated / day</div>
        </div>
        <div style={{ ...subStyle, textAlign:"center", width:"100%" }}>
          <div style={{ fontFamily:INTER, fontSize:38, fontWeight:600, color:C.white, lineHeight:1.4 }}>
            AI agents don't replace you —<br /><span style={{ color:C.accentBright }}>they multiply you.</span>
          </div>
        </div>
        <div style={{ ...ctaStyle, textAlign:"center", width:"100%" }}>
          <div style={{ display:"inline-block", fontFamily:INTER, fontSize:40, fontWeight:800, color:"#0a0a0a", background:"#f59e0b", borderRadius:16, padding:"16px 40px", letterSpacing:0.5, boxShadow:"0 0 40px #f59e0b60" }}>
            mypatientprofit.com
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
