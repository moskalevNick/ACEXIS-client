import React from 'react';
import { Login } from './modules/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CloudModule } from './modules/CloudModule/CloudModule';
import { TodayModule } from './modules/TodayModule/TodayModule';
import { Layout } from './modules/Layout/Layout';
import { FullscreenCamera } from './components/FullscreenCamera/FullscreenCamera';
import { useSelector } from 'react-redux/es/exports';
import { selectFSCamera } from './redux/reducers/globalReducer';

export default function App() {
  const isOpenFullScreenCamera = useSelector(selectFSCamera);

  return (
    <BrowserRouter>
      <div style={{ display: isOpenFullScreenCamera ? 'flex' : 'block' }}>
        <div>
          <Routes>
            <Route path="login" element={<Login />} />
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
  );
}
