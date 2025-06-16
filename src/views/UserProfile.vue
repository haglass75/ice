<template>
  <div class="user-profile">
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-info" v-if="isLoggedIn">
          <div class="avatar">
            <img :src="user.avatar || defaultAvatar" />
            <button class="change-avatar" @click="handleAvatarChange">
              <span>사진변경</span>
            </button>
          </div>
          <div class="user-details">
            <h2>{{ userName }}</h2>
            <p class="email">{{ userEmail }}</p>
            <p class="member-since">
              회원가입일: {{ formatDate(userCreatedAt) }}
            </p>
          </div>
        </div>
        <div class="profile-actions">
          <button class="edit-profile" @click="showEditModal = true">
            프로필 수정
          </button>
        </div>
      </div>

      <div class="profile-content">
        <div class="tabs">
          <button
            :class="['tab-button', { active: currentTab === tab.id }]"
            v-for="tab in tabs"
            :key="tab.id"
            @click="currentTab = tab.id">
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <!-- 개인정보 탭 -->
          <div v-if="currentTab === 'personal'" class="personal-info">
            <div class="info-section">
              <h3>기본 정보</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>이름</label>
                  <p>{{ userName }}</p>
                </div>
                <div class="info-item">
                  <label>이메일</label>
                  <p>{{ userEmail }}</p>
                </div>
                <div class="info-item">
                  <label>휴대폰 번호</label>
                  <p>{{ userPhone }}</p>
                </div>
                <div class="info-item">
                  <label>주소</label>
                  <p>{{ userAddress }} {{ userDetailAddress }}</p>
                </div>
              </div>
            </div>

            <div class="info-section">
              <h3>계정 설정</h3>
              <div class="settings-list">
                <div class="setting-item">
                  <span>이메일 알림</span>
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="user.settings.emailNotifications" />
                    <span class="slider"></span>
                  </label>
                </div>
                <div class="setting-item">
                  <span>SMS 알림</span>
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="user.settings.smsNotifications" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 결제 내역 탭 -->
          <div v-show="currentTab === 'payments'" class="payments">
            <div class="payment-filters">
              <select v-model="paymentFilter">
                <option value="all">전체</option>
                <option value="this-month">이번 달</option>
                <option value="last-month">지난 달</option>
                <option value="this-year">올해</option>
              </select>
            </div>

            <div class="payment-list">
              <div
                v-for="payment in filteredPayments"
                :key="payment.id"
                class="payment-card">
                <div class="payment-header">
                  <span class="amount">{{
                    formatCurrency(payment.amount)
                  }}</span>
                  <span class="status">{{
                    getPaymentStatusText(payment.status)
                  }}</span>
                </div>
                <div class="payment-details">
                  <p class="date">{{ formatDate(payment.date) }}</p>
                  <p class="method">{{ payment.method }}</p>
                </div>
                <div class="payment-actions">
                  <button class="receipt-btn">영수증 보기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 프로필 수정 모달 -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>프로필 수정</h3>
        <form class="edit-form" @submit.prevent="handleProfileUpdate">
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="editForm.name" required />
          </div>
          <div class="form-group">
            <label for="phone">휴대폰 번호</label>
            <input type="tel" id="phone" v-model="editForm.phone" required />
          </div>
          <div class="form-group">
            <label for="address">주소</label>
            <div class="address-input">
              <input
                type="text"
                id="address"
                v-model="editForm.address"
                required />
              <button type="button" class="search-btn">주소검색</button>
            </div>
          </div>
          <div class="form-group">
            <label for="detailAddress">상세주소</label>
            <input
              type="text"
              id="detailAddress"
              v-model="editForm.detailAddress" />
          </div>
          <div class="form-actions">
            <button
              type="button"
              class="cancel-btn"
              @click="showEditModal = false">
              취소
            </button>
            <button type="submit" class="save-btn">저장</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
// 인증 스토어를 가져옵니다.
const authStore = useAuthStore();
const {
  isLoggedIn,
  userName,
  userEmail,
  userPhone,
  userAddress,
  userDetailAddress,
  userCreatedAt,
} = storeToRefs(authStore);

// 프로필 수정 모달 상태
// 모달 상태 관리
const showEditModal = ref(false); // 프로필 수정 모달 표시 여부

// 탭 목록
const tabs = [
  { id: "personal", label: "개인정보" },
  { id: "payments", label: "결제 내역" },
];
const currentTab = ref("personal");

// 사용자 정보
const user = ref({
  name: userName.value,
  email: userEmail.value,
  phone: userPhone.value,
  address: userAddress.value,
  detailAddress: userDetailAddress.value,
  avatar: null,
  createdAt: userCreatedAt.value,
  settings: {
    emailNotifications: true,
    smsNotifications: false,
  },
});

// 기본 아바타 이미지
const defaultAvatar = "/public/images/default-avatar.png";
const paymentFilter = ref("all");

// 결제 내역 (더미 데이터)
const payments = ref([
  {
    id: 1,
    date: "2024-02-20",
    amount: 50000,
    method: "카드",
    status: "completed",
  },
]);

// 결제내역 필터링
const filteredPayments = computed(() => {
  if (paymentFilter.value === "all") return payments.value;
  return payments.value;
});

// 수정 폼 데이터
const editForm = ref({
  name: userName.value,
  phone: userPhone.value,
  address: userAddress.value,
  detailAddress: userDetailAddress.value,
});

// 프로필 업데이트 처리
const handleProfileUpdate = () => {
  // authStore를 통해 사용자 정보 업데이트
  authStore.updateProfile({
    name: editForm.value.name,
    phone: editForm.value.phone,
    address: editForm.value.address,
    detailAddress: editForm.value.detailAddress,
  });

  // 모달 닫기
  showEditModal.value = false;
};

// ✅ 날짜 포맷
function formatDate(date) {
  return new Date(date).toLocaleDateString("ko-KR");
}

// ✅ 통화 포맷
function formatCurrency(amount) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

// ✅ 결제 상태 텍스트
function getPaymentStatusText(status) {
  const statusMap = {
    completed: "결제완료",
    pending: "결제대기",
    failed: "결제실패",
  };
  return statusMap[status] || status;
}
function handleAvatarChange() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  // 파일선택 이벤트 처리
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일사이즈 5MB 제한
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB를 초과 할 수 없습니다.");
        return;
      }
    }
    // Base64로 변환
    const reader = new FileReader();
    reader.onload = function (e) {
      user.value.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
</script>

<style scoped>
.user-profile {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.change-avatar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
}

.user-details h2 {
  margin: 0;
  color: #333;
}

.email {
  color: #666;
  margin: 0.5rem 0;
}

.member-since {
  color: #999;
  font-size: 0.9rem;
}

.edit-profile {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-profile:hover {
  background: #45a049;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-button {
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  position: relative;
}

.tab-button.active {
  color: #4caf50;
  font-weight: 500;
}

.tab-button.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #4caf50;
}

.tab-content {
  padding: 2rem;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.reservation-filters,
.payment-filters {
  margin-bottom: 1.5rem;
}

.reservation-filters select,
.payment-filters select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.reservation-list,
.payment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reservation-card,
.payment-card {
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.reservation-header,
.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status.upcoming {
  background: #e3f2fd;
  color: #1976d2;
}

.status.completed {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.cancelled {
  background: #ffebee;
  color: #c62828;
}

.reservation-details p,
.payment-details p {
  margin: 0.5rem 0;
  color: #666;
}

.reservation-actions,
.payment-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.cancel-btn,
.modify-btn,
.receipt-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #ffebee;
  color: #c62828;
}

.modify-btn {
  background: #e3f2fd;
  color: #1976d2;
}

.receipt-btn {
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

.modal h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.edit-form .form-group {
  margin-bottom: 1.5rem;
}

.edit-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.edit-form input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.save-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 1rem;
  }

  .profile-info {
    flex-direction: column;
    text-align: center;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .tab-button {
    padding: 1rem;
  }
}
</style>
