import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

type LayoutType = {
  setOpenFullscreenCamera: (state: boolean) => void;
  isOpenFullScreenCamera: boolean;
};

export const Layout: React.FC<LayoutType> = ({
  setOpenFullscreenCamera,
  isOpenFullScreenCamera,
}) => {
  return (
    <>
      <Header
        setOpenFullscreenCamera={setOpenFullscreenCamera}
        isOpenFullScreenCamera={isOpenFullScreenCamera}
      />
      <Outlet />
    </>
  );
};
