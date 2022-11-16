import React, { useEffect, useState } from 'react';
import { Login } from './modules/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CloudModule } from './modules/CloudModule/CloudModule';
import { TodayModule } from './modules/TodayModule/TodayModule';
import { Layout } from './modules/Layout/Layout';
import { FullscreenCamera } from './components/FullscreenCamera/FullscreenCamera';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { globalActions } from './redux/global/actions';
import { Loader } from './components/Loader/Loader';

export default function App() {
  const dispatch = useAppDispatch();
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const isAuth = useAppSelector((state) => state.globalReducer.isAuth);
  const isLoading = useAppSelector((state) => state.globalReducer.isLoading);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      dispatch(globalActions.checkAuth());
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : isAuth ? (
    <BrowserRouter>
      <div style={{ display: isOpenFullScreenCamera ? 'flex' : 'block' }}>
        <div>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<TodayModule />} />
              <Route path="cloud" element={<CloudModule />} />
              <Route path="*" element={<Navigate to={'/'} />} />
            </Route>
          </Routes>
        </div>
        {isOpenFullScreenCamera && <FullscreenCamera />}
      </div>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to={'/login'} />} />
      </Routes>
    </BrowserRouter>
  );
}
