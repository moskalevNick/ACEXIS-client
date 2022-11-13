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

export type ExisType = {
  id: string;
  date: Date;
  text: string;
  clientId: string;
};

export type VisitsType = {
  date: Date;
  exisId?: string;
};

export type ClientType = {
  name?: string;
  status: string;
  coincidentIds: string[];
  id: string;
  visits: VisitsType[];
  pinnedExisId?: string;
  bills: number[];
  imgIds: string[];
  exisIds: string[];
  phoneNumber?: string;
  userId: string;
  avatarLink?: string;
};

export type AvatarType = {
  id: string;
  path: string;
  publicUrl: string;
  clientId: string;
};
