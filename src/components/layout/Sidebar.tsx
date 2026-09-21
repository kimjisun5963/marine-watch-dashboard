import React, { useState } from 'react';
// @ts-ignore
import "@assets/stylesheets/Sidebar.scss";
import { menuItems } from '../../assets/mocks/portData';

interface SidebarProps {
  activeMenu?: string;
  onSelectMenu?: (id: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeMenu = "dashboard",
  onSelectMenu,
  onLogout,
}) => {
  // 현재 Hover 중인 아이콘의 ID 관리
  const [hoveredMenuId, setHoveredMenuId] = useState<string | null>(null);

  return (
    <aside className="dashboard-sidebar">
      {/* 메인 아이콘 메뉴 */}
      <nav className="dashboard-sidebar__nav" aria-label="사이드바 메뉴">
        <ul className="dashboard-sidebar__list">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            const isHovered = hoveredMenuId === item.id;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li
                key={item.id}
                className="dashboard-sidebar__item"
                onMouseEnter={() => setHoveredMenuId(item.id)}
                onMouseLeave={() => setHoveredMenuId(null)}
              >
                {/* 1차 아이콘 버튼 */}
                <button
                  type="button"
                  aria-label={item.label}
                  aria-expanded={hasChildren ? isHovered : undefined}
                  className={`dashboard-sidebar__link ${
                    isActive ? 'dashboard-sidebar__link--active' : ''
                  }`}
                  onClick={() => onSelectMenu?.(item.id)}
                >
                  <span className="dashboard-sidebar__icon">
                    <i className={`ri-${item.iconName}`} aria-hidden="true" />
                  </span>
                  <span className="dashboard-sidebar__label">{item.label}</span>
                </button>

                {/* Hover 시 우측에 나타나는 서브메뉴 Floating Layer */}
                {hasChildren && isHovered && (
                  <div className="dashboard-sidebar__sub-popover" role="menu">
                    <div className="dashboard-sidebar__sub-header">
                      {item.label}
                    </div>
                    <ul className="dashboard-sidebar__sub-list">
                      {item.children!.map((sub) => (
                        <li key={sub.id} className="dashboard-sidebar__sub-item" role="none">
                          <button
                            type="button"
                            className="dashboard-sidebar__sub-link"
                            role="menuitem"
                            onClick={() => {
                              onSelectMenu?.(sub.id);
                              setHoveredMenuId(null);
                            }}
                          >
                            {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 하단 로그아웃 영역 (시안 하단 아이콘 배치용) */}
      {onLogout && (
        <div className="dashboard-sidebar__bottom">
          <button
            type="button"
            className="dashboard-sidebar__logout-btn"
            aria-label="로그아웃"
            onClick={onLogout}
          >
            <i className="ri-logout-box-r-line" aria-hidden="true" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;