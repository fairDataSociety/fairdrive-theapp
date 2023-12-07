const MOBILE_SCREEN_WIDTH = 640;

export function isSallScreenSize(): boolean {
  return window.innerWidth <= MOBILE_SCREEN_WIDTH;
}
