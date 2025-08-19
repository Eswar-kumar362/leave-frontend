import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './ui/Layout';
import Landing from './pages/Landing';
import ApplyLeave from './pages/ApplyLeave';
import HRLogin from './pages/HRLogin';
import HRPanel from './pages/HRPanel';

function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/employee/apply" element={<ApplyLeave/>}/>
          <Route path="/hr/login" element={<HRLogin/>}/>
          <Route path="/hr/panel" element={<HRPanel/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
