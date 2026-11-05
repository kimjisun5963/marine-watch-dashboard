import { useState } from 'react'
import 'remixicon/fonts/remixicon.css';
import '../src/assets/stylesheets/global.scss';
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

// 페이지 컴포넌트
import DashboardOverview from './pages/dashboard/DashboardOverview';
import DashboardKpi from './pages/dashboard/DashboardKpi';
import VesselTracking from './pages/vessels/VesselTracking'; 
import BerthStatus from './pages/berths/BerthStatus';
import BerthSchedule from './pages/berths/BerthSchedule'; 
import CraneMonitoring from './pages/cranes/CraneMonitoring';
import AlertCenter from './pages/alerts/AlertCenter';
import SystemSettings from './pages/settings/SystemSettings';


function App() {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
        case 'dashboard':
        case 'overview':
          return <DashboardOverview/>;
        case 'kpi':
          return <DashboardKpi/>;

        case 'vessels':
        case 'inbound':
        case 'docked':
        case 'route-history':
          return <VesselTracking/>;

        case 'berths':
        case 'berth-status':
          return <BerthStatus />;
        case 'schedule':
          return <BerthSchedule />;
        
        case 'cranes':
        case 'quay-crane':
        case 'transfer-crane':
          return <CraneMonitoring />;
        
        case 'alerts':
          return <AlertCenter />;
        
        case 'settings':
          return <SystemSettings />;
        
        default:
          return <DashboardOverview />;
    }
  };

  const handleSelectMenu = (id) => {
    setActiveMenu(id);
  };

  return (
    <div className="app-layout">
      <div className="content">
        <Header />
       
        <Sidebar activeMenu={activeTab} onSelectMenu={setActiveTab} />
        
        <main className='app-layout__main'>
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default App
