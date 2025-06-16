<template>
  <div class="login-container">
    <div class="login-box">
      <h2>로그인</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="이메일을 입력하세요"
            required />
        </div>
        <!-- 유형추가 고객 / 기사 -->
        <div class="form-group">
          <label for="role">유형</label>
          <select id="role" v-model="formData.role" required>
            <option value="customer">고객</option>
            <option value="worker">기사</option>
          </select>
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <div class="password-input">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="formData.password"
              placeholder="비밀번호를 입력하세요"
              required />
            <button
              @click="togglePassword"
              type="button"
              class="toggle-password">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" />
            <span>로그인 상태 유지</span>
          </label>
          <router-link to="/find-password" class="find-password">
            비밀번호 찾기
          </router-link>
        </div>

        <button type="submit" class="login-btn">로그인</button>

        <div class="social-login">
          <p>또는</p>
          <div class="social-buttons">
            <button type="button" class="social-btn google">
              <span class="social-icon">G</span>
              Google로 로그인
            </button>
            <button type="button" class="social-btn kakao">
              <span class="social-icon">K</span>
              카카오로 로그인
            </button>
          </div>
        </div>
      </form>

      <div class="signup-link">
        아직 회원이 아니신가요?
        <router-link to="/signup">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const role = ref("customer");
const formData = ref({
  email: "",
  password: "",
  role: role.value,
  rememberMe: false,
});
const handleLogin = () => {
  // 1.로컬스토리지레서 사용자 데이터 가져오기
  const users = JSON.parse(localStorage.getItem("users") || []);
  // 2.입력된 이메일과 비밀번호로 사용자 찾기
  // find메서드를 이용하여 일치하는 사용자 검색
  // 이메일과 비밀번호가 모두 일치해야 함
  const user = users.find(
    (u) =>
      u.email === formData.value.email &&
      u.password === formData.value.password &&
      u.role === formData.value.role
  );
  // 3.로그인 성공 // 실패 처리
  // if (user) {
  //   // 3-1.로그인 성공시
  //   authStore.login({
  //     email: user.email, // 사용자 이메일
  //     name: user.name, // 사용자 이름
  //     phone: user.phone,
  //     address: user.address,
  //     detailAddress: user.detailAddress,
  //     createdAt: user.createdAt,
  //   });
  //   router.push("/");
  // } else {
  //   alert("이메일 또는 비밀번호가 일치하기 않습니다.");
  // }
  if (user) {
    authStore.login(user);
    if (user.role === "worker") {
      router.push("/worker");
    } else {
      router.push("/");
    }
  } else {
    alert("이메일 또는 비밀번호가 일치하기 않습니다.");
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
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

input ,select{
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: auto;
}

.find-password {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.find-password:hover {
  color: #333;
}

.login-btn {
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
  margin-bottom: 1.5rem;
}

.login-btn:hover {
  background: #45a049;
}

.social-login {
  text-align: center;
  margin-bottom: 1.5rem;
}

.social-login p {
  color: #666;
  margin-bottom: 1rem;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.social-btn img {
  width: 20px;
  height: 20px;
}

.social-btn.google:hover {
  background: #f5f5f5;
}

.social-btn.kakao {
  background: #fee500;
  border-color: #fee500;
}

.social-btn.kakao:hover {
  background: #ffe812;
}

.signup-link {
  text-align: center;
  color: #666;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
}

.signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login {
    padding: 1rem;
  }

  .login-container {
    padding: 1.5rem;
  }
}

.social-icon {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
