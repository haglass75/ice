<template>
  <div class="find-password">
    <div class="find-password-container">
      <h2>비밀번호 찾기</h2>

      <div class="step-1" v-if="!isEmaiverified">
        <p class="description">가입하신 이메일 주소를 입력해주세요.</p>

        <form
          class="find-password-form"
          @submit.prevent="hadleEmailVerification">
          <div class="form-group">
            <label for="email">이메일</label>
            <div class="email-input">
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="이메일을 입력하세요"
                required />
              <button type="submit" class="verify-btn" :disabled="!email">
                인증하기
              </button>
            </div>
          </div>
        </form>

        <div class="login-link">
          <router-link to="/login">로그인으로 돌아가기</router-link>
        </div>
      </div>

      <div class="step-2" v-else-if="!isCodeVerified">
        <p class="description">이메일로 전송된 인증번호를 입력해주세요.</p>

        <form
          class="verification-form"
          @submit.prevent="handleCodeVerification">
          <div class="form-group">
            <label for="verificationCode">인증번호</label>
            <div class="code-input">
              <input
                type="text"
                id="verificationCode"
                v-model="verificationCode"
                placeholder="인증번호 6자리를 입력하세요"
                maxlength="6"
                required />
              <button
                type="button"
                class="resend-btn"
                :disabled="isResendDisabled"
                @click="hadleResendCode">
                {{ resendButtonText }}
              </button>
            </div>
          </div>
          <button type="submit" class="verify-btn">확인</button>
        </form>
      </div>

      <div v-else class="step-3">
        <p class="description">새로운 비밀번호를 입력해주세요.</p>

        <form class="reset-password-form" @submit.prevent="handlePasswordReset">
          <div class="form-group">
            <label for="newPassword">새 비밀번호</label>
            <div class="password-input">
              <input
                id="newPassword"
                :type="showPassword ? 'text' : 'password'"
                v-model="newPassword"
                placeholder="새 비밀번호를 입력하세요"
                required />
              <button
                type="button"
                class="toggle-password"
                @click="togglePassword">
                {{ showPassword ? "숨기기" : "보기" }}
              </button>
            </div>
            <p class="password-hint">8자 이상, 영문, 숫자, 특수문자 포함</p>
          </div>

          <div class="form-group">
            <label for="confirmPassword">새 비밀번호 확인</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="새 비밀번호를 다시 입력하세요"
              required />
          </div>

          <button type="submit" class="reset-btn" :disabled="!isPasswordvaild">
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>

    <!-- 성공 모달 -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <h3>비밀번호 재설정 완료</h3>
        <div class="modal-body">
          <p>비밀번호가 성공적으로 재설정되었습니다.</p>
          <p>새로운 비밀번호로 로그인해주세요.</p>
        </div>
        <button class="close-btn" @click="handleSuccess">확인</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import { ref, computed } from "vue";
const showSuccessModal = ref(false);
const isEmaiverified = ref(false);
const isCodeVerified = ref(false);
const showPassword = ref(false);
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const resendCountdown = ref(0);
const verificationCode = ref("");
let resendInterval = null;
const isResendDisabled = computed(() => resendCountdown.value > 0);
// 인증번호 확인 처리
function hadleEmailVerification() {
  isEmaiverified.value = true;
  startResendCountdown();
}
// 재전송 버튼 텍스트
const resendButtonText = computed(() => {
  return resendCountdown.value > 0
    ? `${resendCountdown.value}초 후 재전송 가능`
    : "인증번호 재전송";
});
function togglePassword() {
  showPassword.value = !showPassword.value;
}
// 재전송 카운트다운
function startResendCountdown() {
  // 1.카운트다운 초기값 설정
  resendCountdown.value = 30;
  //   2.기존에 실행 중인 인벌이 있다면 제거
  if (resendInterval) {
    clearInterval(resendInterval);
  }
  // 3.1초마다 카운트다운을 설정
  resendInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--;
    } else {
      clearInterval(resendInterval);
    }
  }, 1000);
}
// 인증번호 확인처리
// step-3 출력
function handleCodeVerification() {
  isCodeVerified.value = true;
}
function hadleResendCode() {
  startResendCountdown();
}
// 비밀번호 유효성 검사
const isPasswordvaild = computed(() => {
  return (
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value &&
    newPassword.value.length >= 8 && // 최소 8자
    /[A-Za-z]/.test(newPassword.value) && // 영문 포함
    /[0-9]/.test(newPassword.value) && // 숫자 포함
    /[^A-Za-z0-9]/.test(newPassword.value)
  ); // 특수 문자 포함
});
// 비밀번호 재설정 클릭시
function handlePasswordReset() {
  // 1.로컬스토리지에 기존 사용자 정보 가져오기
  // 만약 데이커가 없으면 빈배열([] )을 기본값으로 사용
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  // 2.현재 입력된 이메일로 사용자 찾기
  const userIndex = users.findIndex((u) => u.email === email.value);
  // 3.사용자가 존재하는 경우에만 비밀번호 업데이트
  if (userIndex !== -1) {
    // 3.1 사용자 비밀번호를 새로 입력된 비밀번호로 업데이트
    users[userIndex].password = newPassword.value;
    // 3.2 업데이트된 사용자 정보를 로컬스토리지에 저장
    localStorage.setItem("users", JSON.stringify(users));
    // 3.3 비밀번호 재설정 성공 모달 표시
    showSuccessModal.value = true;
  } else {
    alert("사용자를 찾을 수 없습니다.");
  }
}
// 비밀번호 재설정 성공 처리
function handleSuccess() {
  // 1.성공모달 닫기
  showSuccessModal.value = false;
  // 2.로그인 페이지 이동
  router.push("/login");
}
</script>

<style scoped>
.find-password {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 2rem;
}

.find-password-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
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

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.email-input,
.code-input {
  display: flex;
  gap: 0.5rem;
}

.email-input input,
.code-input input {
  flex: 1;
}

.verify-btn,
.resend-btn {
  padding: 0.75rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.verify-btn:disabled,
.resend-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
}

.password-hint {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

.reset-btn {
  width: 100%;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.reset-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reset-btn:not(:disabled):hover {
  background: #45a049;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
}

.login-link a {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
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
  max-width: 400px;
  text-align: center;
}

.modal h3 {
  margin-bottom: 1rem;
  color: #333;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-body p {
  margin-bottom: 0.5rem;
  color: #666;
}

.close-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn:hover {
  background: #45a049;
}

@media (max-width: 480px) {
  .find-password {
    padding: 1rem;
  }

  .find-password-container {
    padding: 1.5rem;
  }
}
</style>
