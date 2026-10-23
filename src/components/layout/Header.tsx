import React, { useEffect, useState } from 'react';
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

  const [internalTab, setInternalTab] = useState(activeTab || 'dashboard');

  // 부모로부터 받는 `activeTab` 값이 바뀌면 내부 상태도 동기화
  useEffect(() => {
    if (activeTab) {
      setInternalTab(activeTab);
    }
  }, [activeTab]);

  // 컴포넌트 자체에서 관리하는 내부 상태
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlarmListOpen, setIsAlarmListOpen] = useState(false);

  // 실시간 시계
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

  // 다크모드 상태가 바뀔 때 실제 DOM(html 또는 body)에 클래스 반영
  useEffect(() => {
    const themeValue = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeValue);
  }, [isDarkMode]);

  // 메뉴 변경
  const handleTabClick = (id: string) => {
    setInternalTab(id);
    setActiveTab?.(id);
  };

  // dark, light 토글
  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 검색창 토글
  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    if(isSearchOpen){
      setSearchQuery('');
    }
  };

   // 알림창 토글
  const handleAlarmToggle = () => {
    setIsAlarmListOpen((prev) => !prev);
   
  };
  return (
    <div className="dashboard-header-wrapper">
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
              const isActive = internalTab.toLowerCase() === menu.id;
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
              );
            })}
          </ul>
        </nav>
        
        {/* 상태 및 사용자 유틸리티 */}
        <div className="dashboard-header__utils">
          <time className="dashboard-header__time">{time}</time>

          {/* 검색 영역 */}
          <div className="dashboard-header__search">
            {isSearchOpen && (
              <input type="text"
              placeholder='검색어를 입력하세요'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dashboard-header__search-input"
              autoFocus
            />
            )}
            
            <button
              type="button"
              className="dashboard-header__icon-btn"
              aria-label="검색"
              onClick={handleSearchToggle}>
              <i className={isSearchOpen ? 'ri-close-line' : 'ri-search-line'} aria-hidden="true" />
            </button>
          </div>

          {/* 알림 영역 */}
          <div className="dashboard-header__alarm">
            <button
              type="button"
              className="dashboard-header__icon-btn"
              aria-label="알림"
              onClick={handleAlarmToggle}
              >
              <i className={isAlarmListOpen ? 'ri-close-line' : 'ri-notification-line'} aria-hidden="true" />
            </button>

            {isAlarmListOpen && (
              <ul className="dashboard-header__alarm-dropdown">
                <li>
                  <button type="button">
                    <div className="alarm-item__header">
                      <span className="alarm-titile">항만 입항 승인 완료</span>
                      <span className="badge-new"/>
                    </div>
                    <span className="alarm-time">10분 전</span>
                  </button>
                </li>
                <li className="divider" role="separator" />
                <li>
                  <button type="button">
                    <div className="alarm-item__header">
                      <span className="alarm-titile">새로운 공지사항이 등록되었습니다.</span>
                    </div>
                    <span className="alarm-time">1시간 전</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
          {/* 다크모드 토글 스위치 */}
          <label className={`theme-toggle ${isDarkMode ? 'is-checked' : ''}`} aria-label="다크 모드 토글">
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={handleThemeToggle} 
            />
            <span className="theme-toggle__slider" />
            <span className="theme-toggle__handle">
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
    </div>
  );
};

export default Header;