<template>
  <div class="reservation-form">
    <div class="form-container">
      <h2>얼음 제조기 청소 예약</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-section">
          <h3>서비스 유형 선택</h3>
          <div class="service-types">
            <label
              v-for="service in serviceTypes"
              :key="service.id"
              :class="[
                'service-card',
                {
                  selected: formData.serviceType === service.id,
                },
              ]">
              <input
                type="radio"
                :value="service.id"
                required
                v-model="formData.serviceType" />
              <div class="service-content">
                <h4>{{ service.name }}</h4>
                <p class="description">{{ service.description }}</p>
                <p class="price">{{ formatCurrency(service.price) }}</p>
              </div>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3>예약 날짜 및 시간</h3>
          <div class="datetime-picker">
            <div class="form-group">
              <label for="date">날짜</label>
              <input
                v-model="formData.date"
                :min="minDate"
                type="date"
                id="date"
                required />
            </div>
            <div class="form-group">
              <label for="time">시간</label>
              <select v-model="formData.time" id="time" required>
                <option value="">시간 선택</option>
                <option
                  v-for="time in availableTimes"
                  :key="time"
                  :value="time">
                  {{ time }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>주소 정보</h3>
          <div class="form-group">
            <label for="address">주소</label>
            <div class="address-input">
              <input
                v-model="formData.address"
                type="text"
                id="address"
                required />
              <button
                type="button"
                class="search-btn"
                @click="handleAddressSearch">
                주소검색
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="detailAddress">상세주소</label>
            <input
              v-model="formData.detailAddress"
              type="text"
              id="detailAddress"
              required />
          </div>
        </div>

        <div class="form-section">
          <h3>추가 요청사항</h3>
          <div class="form-group">
            <textarea
              v-model="formData.notes"
              placeholder="기사님께 전달할 추가 요청사항을 입력해주세요."
              rows="4"></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="handleCancel">
            취소
          </button>
          <button type="submit" class="submit-btn" :disabled="!isFormVaild">
            예약하기
          </button>
        </div>
      </form>
    </div>

    <!-- 예약 확인 모달 -->
    <div class="modal" v-if="showConfirmModal">
      <div class="modal-content">
        <h3>예약 확인</h3>
        <div class="modal-body">
          <p>다음과 같이 예약하시겠습니까?</p>
          <div class="confirmation-details">
            <div class="detail-item">
              <span class="label">서비스 유형:</span>
              <span class="value">{{
                getServiceName(formData.serviceType)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="label">예약 날짜:</span>
              <span class="value">{{ formatDate(formData.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">예약 시간:</span>
              <span class="value">{{ formData.time }}</span>
            </div>
            <div class="detail-item">
              <span class="label">주소:</span>
              <span class="value">{{ formData.address }}</span>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showConfirmModal = false">
            취소
          </button>
          <button class="confirm-btn" @click="confirmReservation">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
const router = useRouter();
const showConfirmModal = ref(false);
const formData = ref({
  serviceType: "",
  date: "",
  time: "",
  address: "",
  detailAddress: "",
  notes: "",
});

// 서비스 유형 목록 정의
// 각 서비스는 id, name, description, price 정보를 포함
const serviceTypes = ref([
  {
    id: "basic",
    name: "기본 청소",
    description: "기본적인 얼음 제조기 청소 서비스",
    price: 50000,
  },
  {
    id: "deep",
    name: "심층 청소",
    description: "세부 부품까지 철저한 청소 서비스",
    price: 80000,
  },
  {
    id: "premium",
    name: "프리미엄 청소",
    description: "소독 및 부품 점검 포함 프리미엄 서비스",
    price: 120000,
  },
]);
// 예약 가능한 시간대 목록
const availableTimes = ref([
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]);
// min속성에 사용되어 과거 날짜 선택 방지
const minDate = computed(() => {
  const today = new Date();
  console.log(today.toISOString());

  return today.toISOString().split("T")[0];
});
// 날짜를 한국어 형식으로 포맷팅
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR");
};
// 폼제출 문의하기 예약확인 모달표시
const handleSubmit = () => {
  showConfirmModal.value = true;
};
// 예약확인 처리기능 - 예약상태관리페이지 이동
const confirmReservation = () => {
  router.push("/reservation-status/1");
};
// 금액을 한국 원화 형식으로 포맷팅
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency", // 통화(₩)
    currency: "KRW", //대한민국 원으로 표시
  }).format(amount); // 숫자를 읽기 쉬운 문자열로 바꿔줌
};
// 서비스 ID에 해당하는 서비스 이름 반환
const getServiceName = (id) => {
  //   return  console.log(id);
  const service = serviceTypes.value.find((s) => {
    // console.log(s); 하나하나 비교되는 항목 출력
    return s.id === id;
  });

  return service ? service.name : "";
};
//카카오 주소 검색기능
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
// 예약 취소 처리
// 사용자 확인후 홈페이지로 이동
const handleCancel = () => {
  if (confirm("예약을 취소하시겠습니까?")) {
    router.push("/");
  }
};
// 모든 필드가 입력되었는지 확인
const isFormVaild = computed(() => {
  return (
    formData.value.serviceType &&
    formData.value.date &&
    formData.value.time &&
    formData.value.address &&
    formData.value.detailAddress
  );
});
</script>
<style scoped>
.reservation-form {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.form-container {
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

.service-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.service-card {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.service-card.selected {
  border-color: #4caf50;
  background: #f1f8e9;
}

.service-card input[type="radio"] {
  display: none;
}

.service-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.service-content .description {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.service-content .price {
  color: #4caf50;
  font-weight: 500;
  margin: 0;
}

.datetime-picker {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.address-input {
  display: flex;
  gap: 0.5rem;
}

.address-input input {
  flex: 1;
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
  gap: 0.5rem;
  margin-top: 2rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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

.confirmation-details {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.detail-item .label {
  color: #666;
  margin-right: 0.5rem;
}

.detail-item .value {
  color: #333;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.confirm-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .reservation-form {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .service-types {
    grid-template-columns: 1fr;
  }
}
</style>
