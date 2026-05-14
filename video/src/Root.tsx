import React from 'react';
import { Composition } from 'remotion';
import { AgentsVideo } from './AgentsVideo';
const TOTAL_FRAMES = 912;
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PPVideoVertical"
        component={AgentsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
