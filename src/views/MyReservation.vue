<template>
  <div class="my-reservations">
    <div class="reservations-container">
      <h2>나의 예약</h2>

      <div class="filter-section">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="예약 번호 또는 주소로 검색" />
        </div>
        <div class="filter-options">
          <select v-model="statusFilter">
            <option value="">전체 상태</option>
            <option value="upcoming">예정</option>
            <option value="in_progress">진행중</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
          <select v-model="dateFilter">
            <option value="">전체 기간</option>
            <option value="week">1주일</option>
            <option value="month">1개월</option>
            <option value="3months">3개월</option>
            <option value="6months">6개월</option>
          </select>
        </div>
      </div>

      <div class="reservations-list">
        <div
          v-for="reservation in filteredReservations"
          :key="reservation.id"
          class="reservation-card">
          <div class="reservation-header">
            <div class="reservation-info">
              <h3>예약 번호: {{ reservation.id }}</h3>
              <span class="status-badge" :class="reservation.status">
                {{ getStatusText(reservation.status) }}
              </span>
            </div>
            <div class="reservation-date">
              {{ formatDate(reservation.date) }} {{ reservation.time }}
            </div>
          </div>

          <div class="reservation-content">
            <div class="info-grid">
              <div class="info-item">
                <label>서비스 유형</label>
                <p>{{ getServiceName(reservation.serviceType) }}</p>
              </div>
              <div class="info-item">
                <label>주소</label>
                <p>{{ reservation.address }}</p>
              </div>
            </div>
          </div>

          <div class="reservation-actions">
            <button class="detail-btn" @click="handleDetail(reservation.id)">
              상세보기
            </button>
            <button
              class="modify-btn"
              @click="handleModify(reservation.id)"
              :disabled="!canModify(reservation.status)">
              수정
            </button>
            <button
              class="cancel-btn"
              @click="handleCancel(reservation.id)"
              :disabled="!canCancel(reservation.status)">
              취소
            </button>
          </div>
        </div>

        <div v-if="filteredReservations.length === 0" class="empty-state">
          <p>예약 내역이 없습니다.</p>
        </div>
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
          <button class="confirm-btn" @click="confirmCancel">
            예, 취소합니다
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const reservations = ref([
  {
    id: "RES-2025-001",
    serviceType: "basic",
    date: "2025-05-15",
    time: "14:00",
    address: "서울시 강남구 테헤란로 123",
    status: "upcoming",
  },
  {
    id: "RES-2025-002",
    serviceType: "deep",
    date: "2025-03-10",
    time: "10:00",
    address: "서울시 서초구 서초대로 456",
    status: "completed",
  },
  {
    id: "RES-2025-003",
    serviceType: "premium",
    date: "2025-04-08",
    time: "11:00",
    address: "서울시 송파구 올림픽로 789",
    status: "in_progress",
  },
]);

const searchQuery = ref("");
const statusFilter = ref("");
const dateFilter = ref("");
const showCancelModal = ref(false);
const selectedReservationId = ref(null);

const filteredReservations = computed(() => {
  let result = reservations.value;
  console.log("[초기 데이터]", result);

  // 날짜 필터링
  if (dateFilter.value) {
    const now = new Date(); // 오늘
    const fromDate = new Date(); // 시작일
    const toDate = new Date(); // 종료일

    switch (dateFilter.value) {
      case "week":
        fromDate.setDate(now.getDate() - 7);
        toDate.setDate(now.getDate() + 7);
        break;
      case "month":
        fromDate.setMonth(now.getMonth() - 1);
        toDate.setMonth(now.getMonth() + 1);
        break;
      case "3months":
        fromDate.setMonth(now.getMonth() - 3);
        toDate.setMonth(now.getMonth() + 3);
        break;
      case "6months":
        fromDate.setMonth(now.getMonth() - 6);
        toDate.setMonth(now.getMonth() + 6);
        break;
    }

    console.log(
      "[날짜 필터]",
      dateFilter.value,
      "기간:",
      fromDate,
      "~",
      toDate
    );

    result = result.filter((r) => {
      const reservationDate = new Date(r.date + "T00:00:00");
      return reservationDate >= fromDate && reservationDate <= toDate;
    });

    console.log("[날짜 필터링 결과]", result);
  }

  // 상태 필터링
  if (statusFilter.value) {
    console.log("[상태 필터]", statusFilter.value);

    result = result.filter((r) => r.status === statusFilter.value);

    console.log("[상태 필터링 결과]", result);
  }

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    console.log("[검색어 필터]", query);

    result = result.filter(
      (r) =>
        r.id.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query)
    );

    console.log("[검색어 필터링 결과]", result);
  }

  console.log("[최종 결과]", result);
  return result;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR");
};

const getStatusText = (status) => {
  const statusMap = {
    upcoming: "예정",
    in_progress: "진행중",
    completed: "완료",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};

const getServiceName = (id) => {
  const serviceMap = {
    basic: "기본 청소",
    deep: "심층 청소",
    premium: "프리미엄 청소",
  };
  return serviceMap[id] || id;
};

const canModify = (status) => {
  return status === "upcoming";
};

const canCancel = (status) => {
  return status === "upcoming";
};

const handleDetail = (id) => {
  router.push(`/reservation-status/${id}`);
};

const handleModify = (id) => {
  router.push(`/modify-reservation/${id}`);
};

const handleCancel = (id) => {
  selectedReservationId.value = id;
  showCancelModal.value = true;
};

const confirmCancel = () => {
  // TODO: 예약 취소 API 연동
  const index = reservations.value.findIndex(
    (r) => r.id === selectedReservationId.value
  );
  if (index !== -1) {
    reservations.value[index].status = "cancelled";
  }
  showCancelModal.value = false;
  selectedReservationId.value = null;
};
</script>

<style scoped>
.my-reservations {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.reservations-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  flex: 1;
  min-width: 200px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-options select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 120px;
}

.reservations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reservation-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.reservation-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.reservation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reservation-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reservation-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.upcoming {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-badge.in_progress {
  background-color: #fff3e0;
  color: #f57c00;
}

.status-badge.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge.cancelled {
  background-color: #ffebee;
  color: #c62828;
}

.reservation-date {
  color: #666;
  font-size: 0.9rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.info-item p {
  margin: 0;
  color: #333;
  font-weight: 500;
}

.reservation-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.reservation-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.reservation-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.detail-btn {
  background-color: #f5f5f5;
  color: #333;
}

.modify-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.cancel-btn {
  background-color: #ffebee;
  color: #c62828;
}

.detail-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.modify-btn:hover:not(:disabled) {
  background-color: #bbdefb;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #ffcdd2;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
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
  border: none;
}

@media (max-width: 768px) {
  .my-reservations {
    padding: 1rem;
  }

  .reservations-container {
    padding: 1.5rem;
  }

  .filter-section {
    flex-direction: column;
  }

  .reservation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .reservation-actions {
    flex-direction: column;
  }
}
</style>
