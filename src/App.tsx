import React from 'react';
import Form from './pages/Form/Form';
import Session from './pages/Session/Session';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path={`/chat/:id`} element={<Session />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
