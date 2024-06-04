import React from 'react';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import { Routes, Route, useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
