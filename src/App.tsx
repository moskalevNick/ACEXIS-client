import React, { useState } from 'react';
import { Login } from './modules/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CloudModule } from './modules/CloudModule/CloudModule';
import { TodayModule } from './modules/TodayModule/TodayModule';
import { Layout } from './modules/Layout/Layout';
import { FullscreenCamera } from './components/FullscreenCamera/FullscreenCamera';

function App() {
  const [isOpenFullScreenCamera, setOpenFullscreenCamera] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ display: isOpenFullScreenCamera ? 'flex' : 'block' }}>
        <div>
          <Routes>
            <Route
              path="login"
              element={<Login setOpenFullscreenCamera={setOpenFullscreenCamera} />}
            />
            <Route
              element={
                <Layout
                  setOpenFullscreenCamera={setOpenFullscreenCamera}
                  isOpenFullScreenCamera={isOpenFullScreenCamera}
                />
              }
            >
              <Route
                path="/"
                element={<TodayModule isOpenFullScreenCamera={isOpenFullScreenCamera} />}
              />
              <Route
                path="cloud"
                element={<CloudModule isOpenFullScreenCamera={isOpenFullScreenCamera} />}
              />

              <Route path="*" element={<Navigate to={'/'} />} />
            </Route>
          </Routes>
        </div>
        {isOpenFullScreenCamera && (
          <FullscreenCamera setOpenFullscreenCamera={setOpenFullscreenCamera} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
