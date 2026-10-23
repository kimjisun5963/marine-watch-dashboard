import { useState } from 'react'
import 'remixicon/fonts/remixicon.css';
import '../src/assets/stylesheets/global.scss';
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

function App() {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSelectMenu = (id) => {
    setActiveMenu(id);
  };

  return (
    <div className="app-layout">
      <div className="content">
        <Header/>
        <Sidebar setActiveTab={activeTab} onSelectMenu={setActiveTab}/>
        <div className='app-layout__main'>

        </div>
      </div>
    </div>
  )
}

export default App
