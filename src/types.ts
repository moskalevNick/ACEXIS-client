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
  id: string;
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  exises?: ExisType[];
  UserId?: string;
};

export type CreateClientType = {
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  UserId?: string;
};

export type ExisType = {
  id: string;
  date: Date | string;
  text: string;
  isPinned?: boolean;
  clientId?: string;
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
  exisId: string[];
};

export type ImageType = {
  id: string;
  path: string;
  publicUrl: string;
  clientId: string;
};

export type UserAvatarType = {
  id: string;
  path: string;
  publicUrl: string;
  userId?: string;
};

export type CameraFrameType = {
  img_small: string;
};

export type DatepickerDataType = {
  startDate: Date | string;
  endDate: Date | string;
};

export type RangeDataType = {
  min: number;
  max: number;
};

export type FiltersType = {
  date: DatepickerDataType;
  range: RangeDataType;
  status: string[];
  searchString: string;
};

export type clientFilterType = {
  searchString?: string;
  dateFrom?: string;
  dateTo?: string;
  billFrom?: number;
  billTo?: number;
  status?: string;
};

export type UserType = {
  username?: string;
  password?: string;
  minBill?: number;
  maxBill?: number;
  linkBot?: string;
  isRus?: boolean;
  isDark?: boolean;
};
