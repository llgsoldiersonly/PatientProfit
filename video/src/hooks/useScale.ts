import { useVideoConfig } from 'remotion';
export function useScale() {
  const { width } = useVideoConfig();
  return width / 1920;
}
export function useIsVertical() {
  const { width, height } = useVideoConfig();
  return height > width;
}
