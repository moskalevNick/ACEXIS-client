export type ActionType = {
  type?: string;
  payload?: any;
};

export type Theme = 'light' | 'dark';
export type State = {
  theme: Theme;
  isFullScreenCameraOpen: boolean;
};
