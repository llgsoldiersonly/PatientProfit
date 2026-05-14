import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";

const SCENE_DURATION = 192;
const TRANSITION_DURATION = 12;

export const AgentsVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene01 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene02 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene03 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene04 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        presentation={fade()}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene05 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
