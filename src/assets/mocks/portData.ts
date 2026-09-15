// 1. 관제 데이터 타입 정의
export interface PortMetricItem {
  id: string;
  title: string;
  pointTitle?: string;
  data: string | number;
  unit: string;
  icon?: string;
}

// 2. 스마트 항만 & 화물선 관제 더미 데이터
export const mockPortMetrics: PortMetricItem[] = [
  {
    id: 'm1',
    title: 'Total Operation Time',
    data: '1,420',
    unit: '(hour)',
    icon: 'time-line',
  },
  {
    id: 'm2',
    title: 'AVER.',
    pointTitle: 'CONTAINER',
    data: '2,840',
    unit: '(TEU)',
  },
  {
    id: 'm3',
    title: 'AVER.',
    pointTitle: 'SPEED',
    data: '18.5',
    unit: '(kts)',
  },
  {
    id: 'm4',
    title: 'AVER.',
    pointTitle: 'FUEL',
    data: '42.1',
    unit: '(ton/day)',
  },
  {
    id: 'm5',
    title: 'AVER.',
    pointTitle: 'BERTH.WAIT',
    data: '1.2',
    unit: '(hour)',
  },
];

/** sidebar 사이드바 더미 데이터 */
export interface SubMenuItem {
    id: string;
    label : string;
}

export interface MenuItem {
    id: string;
    label: string;
    iconName: string;
    children?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: '종합 관제 대시보드', 
    iconName: 'dashboard-line',
    children: [
      { id: 'overview', label: '실시간 현황 요약' },
      { id: 'kpi', label: '주요 성과 지표(KPI)' }
    ]
  },
  { 
    id: 'vessels', 
    label: '화물선 실시간 위치', 
    iconName: 'ship-line',
    children: [
      { id: 'inbound', label: '입항 예정 선박' },
      { id: 'docked', label: '접안 중 선박' },
      { id: 'route-history', label: '항로 이력 조회' }
    ]
  },
  { 
    id: 'berths', 
    label: '선석/접안 관리', 
    iconName: 'anchor-line',
    children: [
      { id: 'berth-status', label: '선석 점유 현황' },
      { id: 'schedule', label: '접안 일정 표' }
    ]
  },
  { 
    id: 'cranes', 
    label: '크레인/장비 모니터링', 
    iconName: 'crane-line',
    children: [
      { id: 'quay-crane', label: '안벽 크레인 (QC)' },
      { id: 'transfer-crane', label: '야드 크레인 (ARMGC)' }
    ]
  },
  { 
    id: 'alerts', 
    label: '이상 감지 & 알림', 
    iconName: 'alert-line' 
  },
  { 
    id: 'settings', 
    label: '시스템 설정', 
    iconName: 'settings-4-line' 
  },
];