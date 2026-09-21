import { useState } from 'react'
import 'remixicon/fonts/remixicon.css';
import '../src/assets/stylesheets/global.scss';
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

function App() {
  
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleSelectMenu = (id) => {
    setActiveMenu(id);
  };

  return (
    <div className="app-layout">
      <div className="content">
        <Header/>
        <Sidebar activeMenu={activeMenu} onSelectMenu={handleSelectMenu}/>
        <div className='app-layout__main'>

        </div>
      </div>
    </div>
  )
}

export default App
