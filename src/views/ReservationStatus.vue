<template>
  <div class="reservation-status">
    <div class="status-container">
      <h2>예약 상태</h2>

      <div class="status-card">
        <div class="status-header">
          <h3>예약 정보</h3>
          <span class="status-badge" :class="reservation.status">
            {{ getStatusText(reservation.status) }}
          </span>
        </div>

        <div class="status-content">
          <div class="info-grid">
            <div class="info-item">
              <label>예약 번호</label>
              <p>{{ reservation.id }}</p>
            </div>
            <div class="info-item">
              <label>서비스 유형</label>
              <p>{{ getServiceName(reservation.serviceType) }}</p>
            </div>
            <div class="info-item">
              <label>예약 날짜</label>
              <p>{{ formatDate(reservation.date) }}</p>
            </div>
            <div class="info-item">
              <label>예약 시간</label>
              <p>{{ reservation.time }}</p>
            </div>
            <div class="info-item">
              <label>주소</label>
              <p>{{ reservation.address }}</p>
            </div>
            <div class="info-item">
              <label>상세주소</label>
              <p>{{ reservation.detailAddress }}</p>
            </div>
          </div>

          <div class="notes-section">
            <label>추가 요청사항</label>
            <p>{{ reservation.notes }}</p>
          </div>
        </div>
      </div>

      <div class="process-flow">
        <h3>진행 상태</h3>
        <div class="steps">
          <div
            v-for="step in processSteps"
            :key="step.id"
            :class="['step', { active: isStepActive(step.id) }]">
            <div class="step-number">{{ step.id }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="modify-btn" @click="handleModify" :disabled="!canModify">
          예약 수정
        </button>
        <button class="cancel-btn" @click="handleCancel" :disabled="!canCancel">
          예약 취소
        </button>
        <button class="list-btn" @click="handleList">예약 목록</button>
      </div>
    </div>

    <!-- 취소 확인 모달 -->
    <div v-if="showCancelModal" class="modal">
      <div class="modal-content">
        <h3>예약 취소 확인</h3>
        <div class="modal-body">
          <p>정말로 예약을 취소하시겠습니까?</p>
          <p class="warning">취소 후에는 복구할 수 없습니다.</p>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showCancelModal = false">
            아니오
          </button>
          <button class="confirm-btn" @click="confirmCansel">
            예, 취소합니다
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref, computed } from "vue";
// import { useRouter } from "vue-router";
// const router = useRouter();
// 모달 확인
const showCancelModal = ref(false);
// 예약 정보 객체 선언
const reservation = ref({
  id: "RES-2024-001", // 예약 번호
  serviceType: "basic", // 서비스 유형: basic | deep | premium
  date: "2024-03-15", // 예약 날짜
  time: "14:00", // 예약 시간
  address: "서울시 강남구 테헤란로 123", // 주소
  detailAddress: "123동 456호", // 상세주소
  notes: "출입구 비밀번호: 1234", // 요청 사항
  status: "upcoming", // 상태: upcoming | in_progress | completed | cancelled
});
console.log("예약 정보:", reservation.value);

// 진행 단계 배열 (진행 순서)
const processSteps = ref([
  {
    id: 1,
    title: "예약 접수",
    description: "예약이 접수되었습니다.",
  },
  {
    id: 2,
    title: "기사 배정",
    description: "청소 기사가 배정되었습니다.",
  },
  {
    id: 3,
    title: "방문 청소",
    description: "기사님이 방문하여 청소를 진행합니다.",
  },
  {
    id: 4,
    title: "완료",
    description: "청소가 완료되었습니다.",
  },
]);
// 상태 코드 => 텍스트 변환
const getStatusText = (status) => {
  // console.log(status);
  const statusMap = {
    upcoming: "예정",
    in_progress: "진행중",
    completed: "완료",
    cancelled: "취소",
  };
  const text = statusMap[status] || status;
  return text;
};
// 예약 취소가능 여부 : 상태가 "upcoming" 일때만 가능
const canCancel = computed(() => {
  const result = reservation.value.status === "upcoming";
  return result;
});
// 날짜를 YYYY-MM-DD → YYYY. MM. DD. 형식으로 변환
const formatDate = (date) => {
  const formatted = new Date(date).toLocaleDateString("ko-KR");
  console.log("포맷된 날짜:", formatted);
  return formatted;
};
// 서비스 코드 → 서비스명 변환
const getServiceName = (id) => {
  const serviceMap = {
    basic: "기본 청소",
    deep: "심층 청소",
    premium: "프리미엄 청소",
  };
  // status 값을 사람이 보기 쉬운 텍스트로 변환
  const name = serviceMap[id] || id;
  console.log("서비스명:", name);
  return name;
};
// 현재 진행 중인 단계인지 여부
const isStepActive = (stepId) => {
  const statusMap = {
    upcoming: 1,
    in_progress: 2,
    inspection: 3,
    completed: 4,
  };
  const active = statusMap[reservation.value.status] === stepId;
  return active;
};
// 예약 수정하기 클릭시이동
const handleModify = () => {
  router.push(`/modify-reservation/${reservation.value.id}`);
};
//예약 수정가능 여부 : 상태가 "upcoming" 일때만 가능
const canModify = computed(() => {
  const result = reservation.value.status === "upcoming";
  return result;
});
// 예약 취소 버튼 클릭시 - 모달표시
const handleCancel = () => {
  showCancelModal.value = true;
};
// 예약 취소 확성 => 상태변경
const confirmCansel = () => {
  reservation.value.status = "cancelled";
  showCancelModal.value = false;
};
// 예약목록 페이지 이동
const handleList = () => {
  router.push("/my-reservations");
};
</script>

<style scoped>
.reservation-status {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.status-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
}

h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.status-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.upcoming {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.in_progress {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.completed {
  background: #e8f5e9;
  color: #4caf50;
}

.status-badge.cancelled {
  background: #ffebee;
  color: #f44336;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item label {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
}

.info-item p {
  margin: 0;
  color: #333;
}

.notes-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
}

.notes-section label {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
}

.notes-section p {
  margin: 0;
  color: #333;
}

.process-flow {
  margin-bottom: 2rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  opacity: 0.5;
}

.step.active {
  opacity: 1;
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #666;
}

.step.active .step-number {
  background: #4caf50;
  color: white;
}

.step.completed .step-number {
  background: #4caf50;
  color: white;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modify-btn,
.cancel-btn,
.list-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.modify-btn {
  background: #4caf50;
  color: white;
}

.modify-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.cancel-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.list-btn {
  background: #f5f5f5;
  color: #333;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-body .warning {
  color: #f44336;
  margin-top: 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal-actions .cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.modal-actions .confirm-btn {
  background: #f44336;
  color: white;
}
.modal-actions .confirm-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .reservation-status {
    padding: 1rem;
  }

  .status-container {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
