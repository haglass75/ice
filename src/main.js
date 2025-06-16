import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "./assets/main.css";
import "./assets/tailwind.css";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
// 웹사이트가 처음 로드될 때(새로고침하거나 다시 방문할 때) 사용자가 저장해둔 다크 모드 설정을 불러와 적용할 때 사용
// HTML <head> 안에 <script>로 바로 삽입
// → 페이지가 화면에 보이기 전에 다크모드를 먼저 적용하기 위해

// 또는 main.js / index.js / App.vue의 mounted() 안에서 실행
const isDarkMode = localStorage.getItem("darkMode") === "true";

// 만약 다크 모드가 켜져 있다면
if (isDarkMode) {
  // <html> 태그에 "dark" 클래스를 추가해서 화면을 어둡게 만듦
  document.documentElement.classList.add("dark");
} else {
  // 다크 모드가 꺼져 있다면 "dark" 클래스를 제거해서 화면을 밝게 만듦
  document.documentElement.classList.remove("dark");
}
