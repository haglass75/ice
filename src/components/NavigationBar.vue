<template>
  <nav class="navigaion-bar">
    <div class="nav-container">
      <router-link to="/" class="logo">제빙기 청소</router-link>
      <!-- 모바일 -->
      <div class="mobile-wrap">
        <div
          class="hamburger-menu"
          @click="toggleMenu"
          :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="nav-links" :class="{ open: isMenuOpen }">
          <router-link to="/reservation">예약하기</router-link>
          <router-link to="/login" v-if="!isLoggedIn">나의 예약</router-link>
          <router-link to="/my-reservations" v-else>나의 예약</router-link>
          <router-link to="/seviceInfo">서비스 안내</router-link>
          <router-link to="/faq">FAQ</router-link>
          <router-link to="/contact">문의하기</router-link>
        </div>
        <div class="user-menu">
          <router-link to="/login" v-if="!isLoggedIn">로그인</router-link>
          <div class="user-dropdown" v-else>
            <span class="user-name">{{ userName }}</span>

            <div class="dropdown-content">
              <router-link v-if="role === 'worker'" to="/worker"
                >기사페이지</router-link
              >
              <router-link v-if="role === 'customer'" to="/profile"
                >마이페이지</router-link
              >
              <router-link to="/my-reservations" v-if="role === 'customer'"
                >예약내역</router-link
              >
              <a @click="logout"> 로그아웃</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
// 모바일 메뉴의 열림/닫힘 상태를 관리합니다
const isMenuOpen = ref(false);
// 모바일 메뉴 토글 함수
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn, userName, role } = storeToRefs(authStore);
const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<style scoped>
.navigation-bar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  text-decoration: none;
}

.hamburger-menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}
.mobile-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hamburger-menu span {
  width: 25px;
  height: 2px;
  background-color: #333;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4caf50;
}

.user-menu {
  position: relative;
}

.user-dropdown {
  cursor: pointer;
}

.user-name {
  font-weight: 500;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
}

.user-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
}

.dropdown-content a:hover {
  background-color: #f5f5f5;
}

@media screen and (max-width: 768px) {
  .hamburger-menu {
    display: flex;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 4px;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
