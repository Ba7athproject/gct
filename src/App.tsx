import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Evolution from './pages/Evolution';
import Structure from './pages/Structure';
import Sources from './pages/Sources';
import FullReport from './pages/FullReport';

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/report" element={<FullReport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}

export default App;
