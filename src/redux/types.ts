export type ActionType = {
  type?: string;
  payload?: any;
};

export type Theme = 'light' | 'dark';

export type State = {
  theme: Theme;
  isFullScreenCameraOpen: boolean;
  isRussian: boolean;
};

export type ClientType = {
  id?: string;
  name: string;
  status: string;
  phone: string;
  bills?: number[];
  images?: ImageType[];
  visits?: VisitsType[];
};

export type ExisType = {
  id: string;
  date: Date | string;
  text: string;
  isPinned?: boolean;
};

export type EditExisType = {
  id: string;
  text?: string;
  isPinned?: boolean;
};

export type CreateExisType = {
  clientId: string;
  date: Date | string;
  text: string;
};

export type VisitsType = {
  id: string;
  date: Date;
  exisId: string | null;
};

export type ImageType = {
  id: string;
  path: string;
  publicUrl: string;
};
