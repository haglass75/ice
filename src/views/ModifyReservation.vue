<template>
  <div class="modify-reservation">
    <div class="reservation-container">
      <h2>예약 수정</h2>

      <div class="current-info">
        <h3>현재 예약 정보</h3>
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
            <p>{{ formatDate(reservation.date) }} {{ reservation.time }}</p>
          </div>
          <div class="info-item">
            <label>주소</label>
            <p>{{ reservation.address }}</p>
          </div>
          <div class="info-item">
            <label>상태</label>
            <p :class="['status-badge', reservation.status]">
              {{ getStatusText(reservation.status) }}
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="modify-form">
        <div class="form-group">
          <label for="serviceType">서비스 유형</label>
          <select id="serviceType" v-model="formData.serviceType" required>
            <option value="basic">기본 청소</option>
            <option value="deep">심층 청소</option>
            <option value="premium">프리미엄 청소</option>
          </select>
        </div>

        <div class="form-group">
          <label for="date">날짜</label>
          <input
            type="date"
            id="date"
            v-model="formData.date"
            :min="minDate"
            required />
        </div>

        <div class="form-group">
          <label for="time">시간</label>
          <select id="time" v-model="formData.time" required>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>

        <div class="form-group">
          <label for="address">주소</label>
          <div class="input-with-button">
            <input
              type="text"
              id="address"
              v-model="formData.address"
              required
              placeholder="주소를 입력하세요" />
            <button
              type="button"
              class="search-btn"
              @click="handleAddressSearch">
              주소 검색
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="detailAddress">상세 주소</label>
          <input
            type="text"
            id="detailAddress"
            v-model="formData.detailAddress"
            required
            placeholder="상세 주소를 입력하세요" />
        </div>

        <div class="form-group">
          <label for="notes">추가 요청사항</label>
          <textarea
            id="notes"
            v-model="formData.notes"
            rows="3"
            placeholder="추가 요청사항을 입력하세요"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="handleCancel">
            취소
          </button>
          <button type="submit" class="submit-btn">수정하기</button>
        </div>
      </form>
    </div>

    <!-- 수정 확인 모달 -->
    <div class="modal" v-if="showConfirmModal">
      <div class="modal-content">
        <h3>예약 수정 확인</h3>
        <div class="modal-body">
          <p>다음과 같이 예약을 수정하시겠습니까?</p>
          <div class="confirm-info">
            <div class="info-item">
              <label>서비스 유형</label>
              <p>{{ getServiceName(formData.serviceType) }}</p>
            </div>
            <div class="info-item">
              <label>날짜/시간</label>
              <p>{{ formatDate(formData.date) }} {{ formData.time }}</p>
            </div>
            <div class="info-item">
              <label>주소</label>
              <p>{{ formData.address }} {{ formData.detailAddress }}</p>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showConfirmModal = false">
            취소
          </button>
          <button class="confirm-btn" @click="comfirmModify">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref, computed } from "vue";
const showConfirmModal = ref(false);
import { useRoute } from "vue-router";

// Vue Router 인스턴스 생성
// const router = useRouter();
const route = useRoute();
// 현재 예약 정보를 관리하는 반응형 객체
// API에서 받아온 예약 정보를 저장
const reservation = ref({
  id: route.params.id, // URL 파라미터에서 예약 ID 가져오기
  serviceType: "basic",
  date: "2024-03-15",
  time: "14:00",
  address: "서울시 강남구 테헤란로 123",
  detailAddress: "101동 101호",
  status: "upcoming", // 예약 상태 (upcoming, in_progress, completed, cancelled)
  notes: "",
});

// 수정할 예약 정보를 관리하는 반응형 객체
// 현재 예약 정보로 초기화
const formData = ref({
  serviceType: reservation.value.serviceType,
  date: reservation.value.date,
  time: reservation.value.time,
  address: reservation.value.address,
  detailAddress: reservation.value.detailAddress,
  notes: reservation.value.notes,
});

// 수정 확인 모달 표시 여부

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
// date input의 min 속성에 사용되어 과거 날짜 선택 방지
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// 서비스 ID에 해당하는 서비스 이름 반환
const getServiceName = (id) => {
  const serviceMap = {
    basic: "기본 청소",
    deep: "심층 청소",
    premium: "프리미엄 청소",
  };
  return serviceMap[id] || id;
};

// 예약 상태 코드에 해당하는 상태 텍스트 반환
const getStatusText = (status) => {
  const statusMap = {
    upcoming: "예정",
    in_progress: "진행중",
    completed: "완료",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};

// 날짜를 한국어 형식으로 포맷팅
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR");
};

// 카카오 주소 검색 API 호출
// 사용자가 주소 검색 버튼 클릭 시 실행
const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let addr = "";
      let extraAddr = "";

      // 도로명 주소와 지번 주소 구분
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      // 도로명 주소인 경우 추가 정보 처리
      if (data.userSelectedType === "R") {
        // 동/로 정보가 있는 경우 추가
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있는 경우 추가
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 추가 정보가 있는 경우 괄호로 묶기
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        addr += extraAddr;
      }

      // 선택된 주소를 폼 데이터에 설정
      formData.value.address = addr;
    },
  }).open();
};
// 폼제출 처리
const handleSubmit = () => {
  showConfirmModal.value = true;
};
// 예약 수정 확인 처리
const comfirmModify = () => {
  showConfirmModal.value = false;
  router.push("/my-reservations");
};
//  수정 취소 처리 예약목록으로 이동
const handleCancel = () => {
  router.push("/my-reservations");
};
</script>

<style scoped>
.modify-reservation {
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
}

.reservation-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.current-info {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.current-info h3 {
  margin-bottom: 1rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  margin-bottom: 1rem;
}

.info-item label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.info-item p {
  margin: 0;
  color: #333;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
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

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-with-button {
  display: flex;
  gap: 0.5rem;
}

.search-btn {
  padding: 0.75rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.submit-btn {
  background: #4caf50;
  color: white;
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

.modal h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.confirm-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@media (max-width: 768px) {
  .modify-reservation {
    padding: 1rem;
  }

  .reservation-container {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .input-with-button {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }
}
</style>
