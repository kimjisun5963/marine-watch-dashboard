import Raeact, { useEffect, useState } from 'react';
// @ts-ignore
import "@assets/stylesheets/Header.scss";

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  userName?: string;
}

// header 메뉴
const HEADER_MENU_LIST = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports', label: 'Reports' },
  { id: 'documents', label: 'Documents' },
  { id: 'history', label: 'History' },
  { id: 'contacts', label: 'Contacts' },
];

const Header: React.FC<HeaderProps> = ({
  activeTab = "Dashboard",
  setActiveTab,
  userName = "김관제",
}) => {
    
  // 컴포넌트 자체에서 관리하는 내부 상태
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  

  // 시계
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 메뉴 변경
  const handleTabClick = (id: string) => {
    setActiveTab?.(id);
  };

  // dark, light 토글
  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev)
  }

return (
    <header className="dashboard-header">
      {/* 브랜드 / 로고 영역 */}
      <div className="dashboard-header__brand">
        <h1 className="dashboard-header__logo">
          <i className="ri-leaf-fill" aria-hidden="true"/>
          <span>Logo</span>
        </h1>
      </div>

      {/* 스위치 스타일의 메뉴 영역 */}
      <nav className="dashboard-header__nav" aria-label="메인 상단 메뉴">
        <ul className="segmented-menu" role="tablist">
          {HEADER_MENU_LIST.map((menu) => {
            const isActive = activeTab.toLowerCase() === menu.id;
            return (
              <li key={menu.id} className="segmented-menu__item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`segmented-menu__btn ${isActive ? 'segmented-menu__btn--active' : ''}`}
                  onClick={() => handleTabClick(menu.id)}
              >
                  {menu.label}
                </button>
              </li>
            )
          })}
      </ul>
      </nav>
      
      {/* 3. 상태 및 사용자 유틸리티 */}
      <div className="dashboard-header__utils">
        <time className="dashboard-header__time">{time}</time>

        <button type="button" className="dashboard-header__icon-btn" aria-label="검색">
          <i className="ri-search-line" aria-hidden="true" />
        </button>

        <button type="button" className="dashboard-header__icon-btn" aria-label="알림">
          <i className="ri-notification-line" aria-hidden="true" />
        </button>

        {/* 다크모드 토글 스위치 */}
        <label className="theme-toggle" aria-label="다크 모드 토글">
          <input 
            type="checkbox" 
            checked={isDarkMode} 
            onChange={handleThemeToggle} 
          />
          <span className="theme-toggle__slider">
            <i className={isDarkMode ? 'ri-moon-line' : 'ri-sun-line'} aria-hidden="true" />
          </span>
        </label>

        {/* 사용자 드롭다운 영역 */}
        <div className="dashboard-header__user">
          <button 
            type="button" 
            className="dashboard-header__user-btn"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
          >
            <span className="user-name">{userName}님</span>
            <i className="ri-arrow-down-s-line" aria-hidden="true" />
          </button>

          {isUserMenuOpen && (
            <ul className="dashboard-header__user-dropdown">
              <li><button type="button">내 정보 수정</button></li>
              <li className="divider" role="separator" />
              <li><button type="button">환경 설정</button></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;