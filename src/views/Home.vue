<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>얼음 제조기 청소 서비스</h1>
        <p>전문가의 손길로 깨끗하고 안전한 얼음 제조기 관리</p>
        <button class="cta-button" @click="goToReservation">
          지금 예약하기
        </button>
      </div>
    </section>
    <!-- 서비스 소개 섹션 -->
    <section class="services">
      <h2>서비스 소개</h2>
      <div class="service-cards">
        <div class="service-card">
          <div class="icon">🧹</div>
          <h3>기본 청소</h3>
          <p>기본적인 얼음 제조기 청소 서비스</p>
          <p class="price">50,000원</p>
        </div>
        <div class="service-card">
          <div class="icon">🧽</div>
          <h3>심층 청소</h3>
          <p>세부 부품까지 철저한 청소 서비스</p>
          <p class="price">80,000원</p>
        </div>
        <div class="service-card">
          <div class="icon">✨</div>
          <h3>프리미엄 청소</h3>
          <p>소독 및 부품 점검 포함 프리미엄 서비스</p>
          <p class="price">120,000원</p>
        </div>
      </div>
    </section>

    <!-- 서비스 특징 섹션 -->
    <section class="features">
      <h2>서비스 특징</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon">👨‍🔧</div>
          <h3>전문 기술자</h3>
          <p>경험이 풍부한 전문 기술자가 직접 방문</p>
        </div>
        <div class="feature-card">
          <div class="icon">⏱️</div>
          <h3>신속한 서비스</h3>
          <p>예약 즉시 빠른 방문 및 완료</p>
        </div>
        <div class="feature-card">
          <div class="icon">🔧</div>
          <h3>부품 점검</h3>
          <p>청소와 함께 부품 상태 점검</p>
        </div>
        <div class="feature-card">
          <div class="icon">💯</div>
          <h3>품질 보증</h3>
          <p>서비스 만족도 100% 보장</p>
        </div>
      </div>
    </section>

    <!-- 예약 프로세스 섹션 -->
    <section class="process">
      <h2>예약 프로세스</h2>
      <div class="process-steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>서비스 선택</h3>
          <p>원하는 서비스 유형 선택</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>날짜/시간 선택</h3>
          <p>편리한 방문 시간 예약</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>주소 입력</h3>
          <p>방문 주소 입력</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h3>예약 완료</h3>
          <p>예약 확인 및 안내</p>
        </div>
      </div>
    </section>

    <!-- CTA 섹션 -->
    <section class="cta">
      <h2>지금 바로 예약하세요</h2>
      <p>깨끗한 얼음 제조기로 더 건강한 얼음을 만드세요</p>
      <button class="cta-button" @click="goToReservation">예약하기</button>
    </section>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToReservation = () => {
  router.push("/reservation");
};
</script>
<style scoped>
.home {
  min-height: 100vh;
}
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/public/images/default-avatar.png") center / cover;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 0 16px;
}
.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 16px;
}

.hero p {
  font-size: 24px;
  margin-bottom: 32px;
}
.cta-button {
  padding: 16px 32px;
  font-size: 19.2px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.cta-button:hover {
  background-color: #45a049;
}

section {
  padding: 64px 32px;
  text-align: center;
}

h2 {
  font-size: 40px;
  margin-bottom: 48px;
  color: #333;
}

.services {
  background: #f5f5f5;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card .icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.service-card h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.service-card p {
  color: #666;
  margin-bottom: 16px;
}

.service-card .price {
  font-size: 19.2px;
  font-weight: bold;
  color: #4caf50;
}

.features {
  background: white;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 32px;
  border-radius: 8px;
  background: #f5f5f5;
}

.feature-card .icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 19.2px;
  margin-bottom: 8px;
  color: #333;
}

.feature-card p {
  color: #666;
}

.process {
  background: #f5f5f5;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.step {
  position: relative;
  padding: 32px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-number {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.step h3 {
  font-size: 19.2px;
  margin-bottom: 8px;
  color: #333;
}

.step p {
  color: #666;
}

.cta {
  background: #4caf50;
  color: white;
}

.cta h2 {
  color: white;
}

.cta p {
  font-size: 19.2px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .hero p {
    font-size: 19.2px;
  }

  section {
    padding: 48px 16px;
  }

  h2 {
    font-size: 32px;
  }

  .service-cards,
  .feature-grid,
  .process-steps {
    grid-template-columns: 1fr;
  }
}
</style>
