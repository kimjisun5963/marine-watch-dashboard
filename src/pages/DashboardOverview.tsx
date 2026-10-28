import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockPortMetrics } from '@assets/mocks/portData';
import "@assets/stylesheets/DashboardOverview.scss";

// 차트 예시 데이터 (시간대별 하역 물동량 추이)
const throughputData = [
  { time: '00:00', volume: 1200 },
  { time: '04:00', volume: 980 },
  { time: '08:00', volume: 2400 },
  { time: '12:00', volume: 3100 },
  { time: '16:00', volume: 2800 },
  { time: '20:00', volume: 1900 },
  { time: '24:00', volume: 1500 },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      {/* 헤더 섹션 */}
      <div className="page-header">
        <h2 className="page-title">종합 관제 대시보드</h2>
        <p className="page-subtitle">부산항 실시간 해상 교통 및 하역 장비 가동 현황입니다.</p>
      </div>

      {/* 상단 핵심 지표 요약 카드 섹션 (1개 강조 + 4개 일반 카드 = 총 12컬럼) */}
      <div className="row metrics-grid">
        {mockPortMetrics.map((metric, index) => {
          // 첫 번째 카드는 특별히 강조된 '히어로 카드'
          const isHero = index === 0;
          const colClass = isHero ? 'metric-card hero-card col-4' : 'metric-card col-2';

          return (
            <div className={colClass} key={metric.id}>
              <span className="metric-title">
                {metric.title} {metric.pointTitle && <strong>{metric.pointTitle}</strong>}
              </span>
              <strong className="metric-value">
                {metric.data} <small>{metric.unit}</small>
              </strong>
              <span className={`metric-badge ${isHero ? 'positive' : 'warning'}`}>
                {isHero ? '시스템 최적화' : '실시간 연동'}
              </span>
            </div>
          );
        })}
      </div>

      {/* 중단: 차트 & 기상 위젯 영역 (8:4 비율) */}
      <div className="row chart-grid">
        {/* 시간대별 물동량 추이 차트 (col-8) */}
        <div className="content-card col-8">
          <div className="card-header">
            <h3>시간대별 컨테이너 처리 물동량 (TEU)</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={throughputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#108652" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#108652" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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

        {/* 항만 기상 및 안전 상태 위젯 (col-4) */}
        <div className="content-card col-4">
          <div className="card-header">
            <h3>부산항 기상 및 안전 현황</h3>
          </div>
          <div className="weather-widget">

            <div className="info-row">
              <span className='info-icon'>
                <i className="ri-windy-line"></i>
              </span>
              <div className="label-group">
                <span>풍속 / 풍향</span>
                <strong>7.2 m/s (북동풍)</strong>
              </div>

            </div>

            <div className="info-row">
              <span className='info-icon'>
                  <i className="ri-water-flash-line"></i>
                </span>
              <div className="label-group">
                <span>파고 (내항/외항)</span>
                <strong>0.8m / 1.5m</strong>
              </div>
            </div>

            <div className="info-row">
              <span className='info-icon'>
                  <i className="ri-foggy-line"></i>
                </span>
              <div className="label-group">
                <span>시정거리</span>
                <strong>10 km (양호)</strong>
              </div>
            </div>

            <div className="alert-box normal">
              <span className="status-dot"></span>
              현재 도선 및 하역 작업 정상 진행 중
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 실시간 선박 스케줄 테이블 (12컬럼 통째 사용) */}
      <div className="row content-grid">
        <div className="content-card col-12">
          <div className="card-header">
            <h3>실시간 선박 입출항 스케줄</h3>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>선박명</th>
                  <th>선사</th>
                  <th>접안 선석</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HMM_ALGESIRAS</td>
                  <td>HMM</td>
                  <td>Berth #03</td>
                  <td><span className="status-badge docked">접안중</span></td>
                </tr>
                <tr>
                  <td>MSC_OSLO</td>
                  <td>MSC</td>
                  <td>Berth #01</td>
                  <td><span className="status-badge inbound">입항예정</span></td>
                </tr>
                <tr>
                  <td>EVER_GIVEN</td>
                  <td>EVERGREEN</td>
                  <td>Berth #05</td>
                  <td><span className="status-badge outbound">출항완료</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;