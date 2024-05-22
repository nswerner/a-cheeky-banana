import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import CARForm from './components/CARForm';
import MarketAnalysis from './components/MarketAnalysis';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <div className="app" style={{ backgroundColor: '#F6F6F0' }}>
      <AppHeader />
      <div className="my-4" style={{ backgroundColor: '#F6F6F0' }}>
        <Routes>
          <Route path="/" element={<CARForm />} />
          <Route path="/form" element={<CARForm />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <AppFooter style={{ position: 'relative' }} />
    </div>
  );
};

export default App;
