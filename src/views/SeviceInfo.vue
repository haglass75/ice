<template>
  <div class="service-info">
    <h2>서비스 안내</h2>

    <div class="service-section">
      <h3>제빙기 청소 서비스</h3>
      <p class="description">
        전문 청소 기사가 방문하여 제빙기를 깨끗하게 청소해드립니다. 정기적인
        청소로 제빙기의 성능을 유지하고 위생적인 얼음을 제공할 수 있습니다.
      </p>
    </div>

    <div class="service-section">
      <h3>청소 대상 제빙기</h3>
      <div class="machine-types">
        <div class="machine-card">
          <h4>일반 제빙기</h4>
          <p>가정용, 소규모 업소용 제빙기</p>
        </div>
        <div class="machine-card">
          <h4>큐브 제빙기</h4>
          <p>중규모 업소용 큐브형 제빙기</p>
        </div>
        <div class="machine-card">
          <h4>플레이크 제빙기</h4>
          <p>대규모 업소용 플레이크형 제빙기</p>
        </div>
      </div>
    </div>

    <div class="service-section">
      <h3>청소 프로세스</h3>
      <div class="process-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>예약 접수</h4>
            <p>고객의 예약을 접수하고 방문 일정을 조율합니다.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>기사 배정</h4>
            <p>해당 지역의 전문 청소 기사를 배정합니다.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>방문 청소</h4>
            <p>기사가 방문하여 제빙기를 전문적으로 청소합니다.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>작업 완료</h4>
            <p>청소 완료 후 고객 확인을 받습니다.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="service-section">
      <h3>청소 비용</h3>
      <div class="price-table">
        <table>
          <thead>
            <tr>
              <th>제빙기 종류</th>
              <th>기본 청소</th>
              <th>심층 청소</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>일반 제빙기</td>
              <td>50,000원</td>
              <td>80,000원</td>
            </tr>
            <tr>
              <td>큐브 제빙기</td>
              <td>80,000원</td>
              <td>120,000원</td>
            </tr>
            <tr>
              <td>플레이크 제빙기</td>
              <td>120,000원</td>
              <td>180,000원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="service-section">
      <h3>청소 주기 권장</h3>
      <div class="recommendation">
        <div class="recommendation-item">
          <h4>가정용</h4>
          <p>3개월에 1회</p>
        </div>
        <div class="recommendation-item">
          <h4>소규모 업소</h4>
          <p>2개월에 1회</p>
        </div>
        <div class="recommendation-item">
          <h4>중규모 업소</h4>
          <p>1개월에 1회</p>
        </div>
        <div class="recommendation-item">
          <h4>대규모 업소</h4>
          <p>2주에 1회</p>
        </div>
      </div>
    </div>
    <div class="cta-section">
      <router-link to="/reservation" class="cta-button">예약하기</router-link>
    </div>
  </div>
</template>
<style scoped>
.service-info {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
}

.service-section {
  margin-bottom: 3rem;
}

h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.machine-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.machine-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.machine-card h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.step-content {
  width: calc(100% - 30px);
}
.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.price-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f8f9fa;
  font-weight: 500;
}

.recommendation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.recommendation-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.recommendation-item h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background: #45a049;
}

@media (max-width: 768px) {
  .service-info {
    padding: 1rem;
  }

  .machine-types,
  .process-steps,
  .recommendation {
    grid-template-columns: 1fr;
  }
}
</style>
