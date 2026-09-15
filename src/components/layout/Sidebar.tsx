import React from 'react';
import "@assets/stylesheets/Sidebar.scss";
import { menuItems } from '../../assets/mocks/portData';

interface SidebarProps {
  activeMenu?: string;
  onSelectMenu?: (id: string) => void;
}

const Sidebar = ({ activeMenu = "dashboard", onSelectMenu }: SidebarProps) => {
  return (
    <aside className="dashboard-sidebar">
      <nav className="dashboard-sidebar__nav">
        <ul className="dashboard-sidebar__list">
          {menuItems.map((item) => {
            const isActive = item.id === activeMenu;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.id} className="dashboard-sidebar__item">
                <button
                  type="button"
                  className={`dashboard-sidebar__link ${isActive ? 'dashboard-sidebar__link--active' : ''}`}
                  onClick={() => onSelectMenu?.(item.id)}
                >
                  <span className="dashboard-sidebar__icon">
                    {/* Remix 컴포넌트 대신 i 태그로 직접 아이콘 클래스 바인딩 */}
                    <i className={`ri-${item.iconName}`} />
                  </span>
                  <span className="dashboard-sidebar__label">{item.label}</span>
                </button>

                {/* 하위 서브메뉴 */}
                {hasChildren && (
                  <ul className="dashboard-sidebar__sub-list">
                    {item.children!.map((sub) => (
                      <li key={sub.id} className="dashboard-sidebar__sub-item">
                        <button
                          type="button"
                          className="dashboard-sidebar__sub-link"
                          onClick={() => onSelectMenu?.(sub.id)}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;