import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SessionStatus from './Views/SessionStatus/index'
import SessionManagement from './Views/SessionManagement/index'

export default function Router() {

  return (
  /* TODO: Create PrivateRoutes */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SessionManagement />} />
        <Route path="/session=status" element={<SessionStatus />} />
      </Routes>
    </BrowserRouter>
  );
}
