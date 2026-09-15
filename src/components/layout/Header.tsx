import React, { useEffect, useState } from 'react';
import "@assets/stylesheets/Header.scss"

interface HeaderProps {
    userName?: string;
    onLogout?: () => void;
}

const Header = ({ userName = '관리자', onLogout }: HeaderProps) => {
    
    // 컴포넌트 자체에서 관리하는 내부 상태
    const [time, setTime] = useState<string>('');

    useEffect(()=> {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

return (
    <header className="dashboard-header">
      {/* 브랜드 / 로고 영역 */}
      <div className="dashboard-header__brand">
        <h1>Logo</h1>
      </div>

      {/* 상태 및 사용자 유틸리티 영역 */}
      <div className="dashboard-header__utils">
        <span className="time-display">{time}</span>
        <span className="user-name">{userName}님</span>
        {onLogout && (
          <button type="button" onClick={onLogout}>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};