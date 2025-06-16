<template>
  <div class="contact">
    <h2>문의하기</h2>
    <div class="contact-container">
      <!-- 고객센터 -->
      <div class="contact-info">
        <h3>고객센터 연락처</h3>
        <div class="info-item">
          <span class="label">전화번호</span>
          <span class="value">1588-1234</span>
        </div>
        <div class="info-item">
          <span class="label">이메일</span>
          <span class="value">support@iceclean.com</span>
        </div>
        <div class="info-item">
          <span class="label">운영시간</span>
          <span class="value">평일 09:00 - 18:00 (주말/공휴일 휴무)</span>
        </div>
      </div>
      <!-- 문의하기 -->
      <form class="contact-form" @submit.prevent="submitInquiry">
        <!-- 문의 유형 -->
        <div class="form-group">
          <label for="category">문의 유형</label>
          <select
            v-model="formData.category"
            name="category"
            id="category"
            required>
            <option value="">선택하세요</option>
            <option value="reservation">예약 관련</option>
            <option value="service">서비스 관련</option>
            <option value="payment">결제 관련</option>
            <option value="cancellation">취소/환불</option>
            <option value="etc">기타 문의</option>
          </select>
        </div>
        <!-- 이름 -->
        <div class="form-group">
          <label for="name">이름</label>
          <input v-model="formData.name" type="text" id="name" required />
        </div>
        <!-- 이메일 -->
        <div class="form-group">
          <label for="email">이메일</label>
          <input v-model="formData.email" type="email" id="email" required />
        </div>
        <!-- 연락처 -->
        <div class="form-group">
          <label for="phone">연락처</label>
          <input v-model="formData.phone" type="phone" id="phone" required />
        </div>
        <!-- 제목 -->
        <div class="form-group">
          <label for="title">제목</label>
          <input v-model="formData.title" type="text" id="title" required />
        </div>
        <!-- 문의 내용 -->
        <div class="form-group">
          <label for="content">문의 내용</label>
          <textarea
            v-model="formData.content"
            rows="5"
            id="content"
            placeholder="문의 내용을 작성해주세요."></textarea>
        </div>
        <div class="form-group">
          <label for="file-label">
            <input
              @change="hadleFileUpload"
              type="file"
              accept="image/*, .pdf" />
            <span class="file-text">파일 첨부(선택)</span>
          </label>
          <p class="file-hint">이미지 또는 PDF 파일만 첨부 가능합니다.</p>
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="formData.agreePrivacy" type="checkbox" required />
            <span>개인정보 수집 및 이용에 동의합니다.</span>
          </label>
        </div>
        <button type="submit" class="submit-btn">문의하기</button>
      </form>
    </div>
  </div>
  <!-- 이미지 모달 추가 -->
  <div class="modal" v-if="showImageModal" @click="showImageModal = null">
    <div class="modal-content image-modal">
      <img :src="selectedImage" alt="확대된 이미지" />
    </div>
  </div>
  <!-- 문의 내용 확인 모달 추가 -->
  <div v-if="showConfirmModal" class="modal">
    <div class="modal-content">
      <h3>문의 내용 확인</h3>
      <div class="modal-body">
        <div class="confirm-info">
          <div class="info-item">
            <span class="label">문의 유형</span>
            <span class="value">{{ getCategoryName(formData.category) }}</span>
          </div>
          <div class="info-item">
            <span class="label">이름</span>
            <span class="value">{{ formData.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">이메일</span>
            <span class="value">{{ formData.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">연락처</span>
            <span class="value">{{ formData.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">제목</span>
            <span class="value">{{ formData.title }}</span>
          </div>
          <div class="info-item">
            <span class="label">문의 내용</span>
            <span class="value content">{{ formData.content }}</span>
          </div>
          <div class="info-item" v-if="formData.file">
            <span class="label">첨부 파일</span>
            <span class="value">{{ formData.file.name }}</span>
            <div v-if="isImageFile" class="image-preview">
              <img :src="imagePreviewUrl" alt="첨부 이미지" />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="cancel-btn" @click="showConfirmModal = false">
          수정하기
        </button>
        <button class="confirm-btn" @click="confirmSubmit">문의하기</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showConfirmModal = ref(false); //문의 확인 모달
const imagePreviewUrl = ref(null); //이미지 미리보기 URL
const showImageModal = ref(false); //이미지 모달
const selectedImage = ref(null); //선택된 이미지
const formData = ref({
  category: "",
  name: "",
  email: "",
  phone: "",
  title: "",
  content: "",
  file: null,
  agreePrivacy: false,
});
function submitInquiry() {
  showConfirmModal.value = true;
}
// 문의 카테고리 변환
function getCategoryName(category) {
  const categoryMap = {
    reservation: "예약 관련",
    service: "서비스 관련",
    payment: "결제 관련",
    cancellation: "취소/환불",
    etc: "기타 문의",
  };
  return categoryMap[category] || category;
}
// 이미지 파일 여부 판단
const isImageFile = computed(() =>
  formData.value.file ? formData.value.file.type.startsWith("image/") : false
);
// 파일 업로그 처리
function hadleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    formData.value.file = file;
    if (file.type.startsWith("image/")) {
      imagePreviewUrl.value = URL.createObjectURL(file);
    }
  }
}
function confirmSubmit() {
  alert("문의가 접수 되었습니다. 빠른시일내에 답변 드리겠습니다.");
  router.push("/");
}
</script>
<style scoped>
.contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
.contact-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.contact-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.contact-info h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.info-item {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 500;
  color: #333;
}

.contact-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

textarea {
  resize: vertical;
}

.file-label {
  display: inline-block;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.file-label input[type="file"] {
  display: none;
}

.file-text {
  color: #666;
}

.file-hint {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
}

.submit-btn {
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
}

.submit-btn:hover {
  background: #45a049;
}

/* 모달 스타일 추가 */
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.confirm-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 4px;
}

.confirm-info .info-item {
  margin-bottom: 1rem;
}

.confirm-info .info-item:last-child {
  margin-bottom: 0;
}

.confirm-info .label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.confirm-info .value {
  display: block;
  color: #333;
  font-weight: 500;
}

.confirm-info .content {
  white-space: pre-wrap;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn:hover {
  background: #45a049;
}

/* 이미지 미리보기 스타일 추가 */
.image-preview {
  margin-top: 1rem;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
  max-height: 300px;
  object-fit: contain;
}

/* 모달 내 이미지 미리보기 스타일 조정 */
.confirm-info .image-preview {
  margin-top: 0.5rem;
  border: 1px solid #ddd;
}

.confirm-info .image-preview img {
  max-height: 200px;
}

/* 진행 중인 문의 목록 스타일 */
.inquiry-list {
  grid-column: 1 / -1;
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.inquiry-list h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.no-inquiries {
  text-align: center;
  color: #666;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.inquiry-items {
  display: grid;
  gap: 1rem;
}

.inquiry-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
}

.inquiry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.inquiry-category {
  font-size: 0.9rem;
  color: #666;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.inquiry-status {
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.inquiry-status.pending {
  background: #fff3cd;
  color: #856404;
}

.inquiry-status.in_progress {
  background: #cce5ff;
  color: #004085;
}

.inquiry-status.completed {
  background: #d4edda;
  color: #155724;
}

.inquiry-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.inquiry-title {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
}

.inquiry-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.inquiry-content {
  color: #666;
  line-height: 1.5;
}

.inquiry-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.inquiry-images img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.inquiry-images img:hover {
  transform: scale(1.05);
}

/* 이미지 모달 스타일 */
.image-modal {
  max-width: 90vw;
  max-height: 90vh;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.image-modal img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}
textarea {
  resize: vertical;
}

.file-label {
  display: inline-block;
  cursor: pointer;
  background-color: #f1f1f1;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  border: 1px dashed #ccc;
  width: 100%;
}

.file-text {
  color: #555;
}

.file-hint {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
