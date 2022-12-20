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

export type SimilarType = {
  base64image: string | null;
  clientId: string;
  face_id: string;
  id: string;
  image: SimilarImageType;
};

export type ClientType = {
  id: string;
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  face_id?: string[];
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  exises?: ExisType[];
  UserId?: string;
  similar?: SimilarType[];
  lastIdentified?: Date | null;
};

export type CreateClientType = {
  name: string;
  status: string;
  phone: string;
  face_id?: string[];
  averageBill?: number;
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  UserId?: string;
};

export type UpdateClientType = {
  id?: string;
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  face_id?: string[];
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  exises?: ExisType[];
  UserId?: string;
  similar?: SimilarType[];
};

export type ExisType = {
  id: string;
  date: Date | string;
  text: string;
  isPinned?: boolean;
  clientId?: string;
  visitId?: string;
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
export type UpdateVisitType = {
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

export type SimilarImageType = {
  id: string;
  path: string;
  publicUrl: string;
  similarId?: string;
};

export type CameraFrameType = {
  img_small: string;
  faces: [];
};

export type DatepickerDataType = {
  startDate: Date | string | null;
  endDate: Date | string | null;
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
  chatId?: string;
  isRus?: boolean;
  isDark?: boolean;
};
