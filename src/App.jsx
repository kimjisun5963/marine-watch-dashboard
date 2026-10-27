import { useState } from 'react'
import 'remixicon/fonts/remixicon.css';
import '../src/assets/stylesheets/global.scss';
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

// 페이지 컴포넌트
import DashboardOverview from './pages/DashboardOverview';
import VesselTracking from './pages/VesselTracking';
import BerthManagement from './pages/BerthManagement';
import CraneMonitoring from './pages/CraneMonitoring';
import AlertCenter from './pages/AlertCenter';
import SystemSettings from './pages/SystemSettings';


function App() {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
        case 'dashboard':
        case 'overview':
        case 'kpi':
          return <DashboardOverview/>;

        case 'vessels':
        case 'inbound':
        case 'docked':
        case 'route-history':
          return <VesselTracking/>;

        case 'berths':
        case 'berth-status':
        case 'schedule':
          return <BerthManagement />;
        
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
