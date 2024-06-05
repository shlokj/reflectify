import React from 'react';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RapidFireGame from './screens/RapidFireGame';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/game/rapidfire' element={<RapidFireGame />} />
      </Routes>
    </div>
  );
};

export default App;
