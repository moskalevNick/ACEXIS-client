import 'react-notifications-component/dist/theme.css';
import { Store } from 'react-notifications-component';

type TransitionType = {
  duration: number;
  timingFunction: string;
  delay: number;
};

type NotificationCustomType = {
  htmlClasses: string[];
  name: string;
};

type NotificationDismissType = {
  duration: number;
  onScreen?: boolean;
  pauseOnHover?: boolean;
  waitForAnimation?: boolean;
  click?: boolean;
  touch?: boolean;
  showIcon?: boolean;
};

type nottificationType = {
  id?: string;
  onRemoval?: (id: string, removalFlag: string) => void;
  content?: React.ReactElement;
  title?: string;
  message?: string;
  type?: 'success' | 'danger' | 'info' | 'default' | 'warning';
  insert?: 'top' | 'bottom';
  container?:
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'center'
    | 'top-full'
    | 'bottom-full';
  animationIn?: string[];
  animationOut?: string[];
  dismiss?: NotificationDismissType;
  slidingEnter?: TransitionType;
  slidingExit?: TransitionType;
  touchRevert?: TransitionType;
  touchSlidingExit?: {
    fade: TransitionType;
    swipe: TransitionType;
  };
  userDefinedTypes?: NotificationCustomType[];
  width?: number;
  hasBeenRemoved?: boolean;
};

export const Nottification = ({
  id,
  onRemoval,
  content,
  title = 'Wonderful!',
  message = 'teodosii@react-notifications-component',
  type = 'success',
  insert = 'top',
  container = 'top-right',
  animationIn = ['animate__animated', 'animate__fadeIn'],
  animationOut = ['animate__animated', 'animate__fadeOut'],
  dismiss = {
    duration: 5000,
    onScreen: true,
  },
  slidingEnter,
  slidingExit,
  touchRevert,
  touchSlidingExit,
  userDefinedTypes,
  width,
  hasBeenRemoved,
}: nottificationType) => {
  Store.addNotification({
    id,
    onRemoval,
    content,
    title,
    message,
    type,
    insert,
    container,
    animationIn,
    dismiss,
    animationOut,
    slidingEnter,
    slidingExit,
    touchRevert,
    touchSlidingExit,
    userDefinedTypes,
    width,
    hasBeenRemoved,
  });
};
