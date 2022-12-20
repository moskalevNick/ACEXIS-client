import React, { useEffect } from 'react';
import { Login } from './modules/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CloudModule } from './modules/CloudModule/CloudModule';
import { ClientModule } from './modules/ClientModule';
import { TodayModule } from './modules/TodayModule/TodayModule';
import { Layout } from './modules/Layout/Layout';
import { FullscreenCamera } from './components/FullscreenCamera/FullscreenCamera';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { globalActions } from './redux/global/actions';
import { Loader } from './components/Loader/Loader';
import { Founder } from './containers/Founder';
import { Registration } from './modules/Registration/Registration';

export default function App() {
  const dispatch = useAppDispatch();
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { isAuth, isLoading, role } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      dispatch(globalActions.checkAuth());
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuth) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (role === 'admin') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/registration" replace={true} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div style={{ display: isOpenFullScreenCamera ? 'flex' : 'block' }}>
        <div>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<TodayModule />} />
              <Route path="cloud" element={<CloudModule />} />
              <Route path="cloud/:id" element={<Founder component={ClientModule} />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Route>
          </Routes>
        </div>
        {isOpenFullScreenCamera && <FullscreenCamera />}
      </div>
    </BrowserRouter>
  );
}
