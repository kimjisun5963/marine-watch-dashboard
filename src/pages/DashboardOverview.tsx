import React from 'react';
import "@assets/stylesheets/DashboardOverview.scss";

const DashboardOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h2 className="page-title">종합 관제 대시보드</h2>
        <p className="page-subtitle">부산항 실시간 해상 교통 및 하역 장비 가동 현황입니다.</p>
      </div>

      {/* 상단 핵심 지표 요약 카드 섹션 */}
      <div className="row metrics-grid">
        <div className="metric-card col-3">
          <span className="metric-title">실시간 입항 선박</span>
          <strong className="metric-value">24 <small>척</small></strong>
          <span className="metric-badge positive">+12% 전일 대비</span>
        </div>

        <div className="metric-card col-3">
          <span className="metric-title">선석 점유율</span>
          <strong className="metric-value">88.5<small>%</small></strong>
          <span className="metric-badge warning">혼잡 보통</span>
        </div>

        <div className="metric-card col-3">
          <span className="metric-title">안벽 크레인(QC) 가동률</span>
          <strong className="metric-value">94.2<small>%</small></strong>
          <span className="metric-badge positive">정상 가동</span>
        </div>

        <div className="metric-card col-3">
          <span className="metric-title">금일 총 물동량</span>
          <strong className="metric-value">12,480 <small>TEU</small></strong>
          <span className="metric-badge positive">목표 달성 중</span>
        </div>
      </div>

      {/* 하단 상세 정보 및 실시간 현황 영역 */}
      <div className="row content-grid">
        <div className="content-card col-8">
          <h3>실시간 선박 입출항 스케줄</h3>
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