import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Evolution from './pages/Evolution';
import Structure from './pages/Structure';
import Sources from './pages/Sources';
import FullReport from './pages/FullReport';
import HistoricalApproach from './pages/HistoricalApproach';
import Methodology from './pages/Methodology';
import EcologyDashboard from './pages/EcologyDashboard';
import GovernancePlaceholder from './pages/GovernancePlaceholder';
import EcologyReport from './pages/EcologyReport';
import FinanceReport from './pages/FinanceReport';

function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          {/* Finance View Routes */}
          <Route path="/finance" element={<Dashboard />} />
          <Route path="/finance/evolution" element={<Evolution />} />
          <Route path="/finance/structure" element={<Structure />} />
          <Route path="/finance/sources" element={<Sources />} />
          <Route path="/finance/historical" element={<HistoricalApproach />} />
          <Route path="/finance/report" element={<FullReport />} />
          <Route path="/finance/report-md" element={<FinanceReport />} />
          <Route path="/finance/methodology" element={<Methodology />} />

          {/* Ecology View Routes */}
          <Route path="/ecology" element={<EcologyDashboard />} />
          <Route path="/ecology/report" element={<EcologyReport />} />
          <Route path="/ecology/*" element={<EcologyDashboard />} />

          {/* Governance View Routes */}
          <Route path="/governance" element={<GovernancePlaceholder />} />
          <Route path="/governance/*" element={<GovernancePlaceholder />} />

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/finance" replace />} />
          <Route path="*" element={<Navigate to="/finance" replace />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}

export default App;
