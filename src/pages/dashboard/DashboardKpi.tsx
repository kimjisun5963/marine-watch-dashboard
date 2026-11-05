import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockPortMetrics } from '@assets/mocks/portData';
import "@assets/stylesheets/DashboardKpi.scss";


// kpi 전용 성과 데이터
const kpiSummaryMetrics = [
  { id: 'k1', title: '평균 선석 생산성', value: '45.2', unit: 'TEU/h', change: '+4.1%', positive: true },
  { id: 'k2', title: '크레인 평균 가동률', value: '88.5', unit: '%', change: '+2.3%', positive: true },
  { id: 'k3', title: '평균 선박 체류시간', value: '14.2', unit: '시간', change: '-1.5시간', positive: false },
  { id: 'k4', title: '금일 누적 물동량', value: '18,420', unit: 'TEU', change: '+12.8%', positive: true },
];

// 차트 예시 데이터
const craneEfficiencyData = [
  { name: 'QC #01', efficiency: 92 },
  { name: 'QC #02', efficiency: 85 },
  { name: 'QC #03', efficiency: 94 },
  { name: 'QC #04', efficiency: 78 },
  { name: 'QC #05', efficiency: 90 },
];
const throughputData = [
  { time: '00:00', volume: 1200 },
  { time: '04:00', volume: 980 },
  { time: '08:00', volume: 2400 },
  { time: '12:00', volume: 3100 },
  { time: '16:00', volume: 2800 },
  { time: '20:00', volume: 1900 },
];


const DashboardKpi: React.FC = () => {
  return (
    <div className="dashboard-kpi">
      {/* 헤더 섹션 */}
      <div className="page-header">
        <h2 className="page-title">항만 운영 성과(KPI) 대시보드</h2>
        <p className="page-subtitle">부산항의 생산성, 장비 효율성 및 시간별 처리 성과를 분석합니다.</p>
      </div>

      {/* 상단 핵심 지표 요약 카드 섹션 (1개 강조 + 4개 일반 카드 = 총 12컬럼) */}
      <div className="row metrics-grid">
        {kpiSummaryMetrics.map((kpi) => {
          return (
            <div className="metric-card col-3" key={kpi.id}>
              <span className="metric-title">{kpi.title}</span>
              <strong className="metric-value">
                {kpi.value} <small>{kpi.unit}</small>
              </strong>
              <span className={`metric-badge ${kpi.positive ? 'positive' : 'warning'}`}>
                전일 대비 {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* 중단: 차트 & 기상 위젯 영역 (8:4 비율) */}
      <div className="row chart-grid">
        {/* 시간대별 물동량 추이 차트 (col-8) */}
        <div className="content-card col-6">
          <div className="card-header">
            <h3>시간대별 물동량 처리 성과 (TEU)</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in srgb, var(--border-color) 40%, transparent)" />
                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                  }}
                />
                <Area type="monotone" dataKey="volume" stroke="#108652" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 안벽 크레인(QC)별 가동 효율성 바 차트 */}
        <div className="content-card col-6">
          <div className="card-header">
            <h3>안벽 크레인(QC)별 가동 효율성</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={craneEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#727272" fontSize={12} />
                <YAxis stroke="#727272" fontSize={12} />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
          </div>
        </div>
      </div>

     </div>
  );
};

export default DashboardKpi;