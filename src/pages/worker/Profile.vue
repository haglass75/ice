<template>
  <div class="p-8 max-w-7xl mx-auto">
    <!-- 프로필 헤더 -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">기사 프로필</h1>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
        <span class="text-sm text-gray-600">온라인</span>
      </div>
    </div>

    <div class="space-y-8">
      <!-- 프로필 섹션 -->
      <div
        class="grid md:grid-cols-[200px_1fr] gap-8 bg-white rounded-xl shadow-sm p-8">
        <!-- 프로필 이미지 -->
        <div class="relative w-48 h-48 mx-auto md:mx-0">
          <img
            :src="profileImage"
            alt="프로필 이미지"
            class="w-full h-full object-cover rounded-full" />
          <button
            @click="uploadImage"
            class="absolute bottom-2 right-1/2 transform translate-x-1/2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <i class="fas fa-camera"></i>
          </button>
        </div>

        <!-- 프로필 정보 -->
        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-sm text-gray-600">이름</label>
            <div class="relative">
              <input
                v-model="driverName"
                :disabled="!isEditing"
                type="text"
                placeholder="이름을 입력하세요"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
              <i
                class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">연락처</label>
            <div class="relative">
              <input
                v-model="driverPhone"
                :disabled="!isEditing"
                type="tel"
                placeholder="연락처를 입력하세요"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
              <i
                class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">이메일</label>
            <div class="relative">
              <input
                v-model="driverEmail"
                :disabled="!isEditing"
                type="email"
                placeholder="이메일을 입력하세요"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
              <i
                class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-gray-600">차량 정보</label>
            <div class="relative">
              <input
                v-model="vehicleInfo"
                :disabled="!isEditing"
                type="text"
                placeholder="차량 정보를 입력하세요"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed" />
              <i
                class="fas fa-car absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 통계 카드 -->
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div
            class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
            <i class="fas fa-check-circle"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-600">총 완료 작업</h3>
            <p class="text-2xl font-semibold text-gray-800">156</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div
            class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl">
            <i class="fas fa-star"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-600">평균 평가</h3>
            <p class="text-2xl font-semibold text-gray-800">
              {{ averageRating }}
            </p>
            <div class="flex gap-1 mt-1">
              <template v-for="n in 5" :key="n">
                <i
                  v-if="n <= Math.floor(averageRating)"
                  class="fas fa-star text-sm md:text-base text-yellow-400"></i>
                <i
                  v-else-if="n - 0.5 <= averageRating"
                  class="fas fa-star-half-alt text-sm md:text-base text-yellow-400"></i>
                <i
                  v-else
                  class="fas fa-star text-sm md:text-base text-gray-300"></i>
              </template>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
          <div
            class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
            <i class="fas fa-clock"></i>
          </div>
          <div>
            <h3 class="text-sm text-gray-600">평균 작업 시간</h3>
            <p class="text-2xl font-semibold text-gray-800">45분</p>
          </div>
        </div>
      </div>

      <!-- 액션 버튼 -->
      <div class="flex justify-end gap-4">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          <i class="fas fa-edit"></i>
          프로필 수정
        </button>
        <div v-else class="flex gap-4">
          <button
            @click="saveProfile"
            class="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
            <i class="fas fa-save"></i>
            저장
          </button>
          <button
            @click="cancelEditing"
            class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
            <i class="fas fa-times"></i>
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 이미지 업로드 모달 -->
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-800">
            프로필 이미지 변경
          </h3>
          <button
            @click="closeImageModal"
            class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="space-y-6">
          <div
            @click="triggerFileInput"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              ref="fileInput"
              class="hidden" />
            <div
              v-if="imagePreview"
              class="w-48 h-48 mx-auto rounded-lg overflow-hidden">
              <img
                :src="imagePreview"
                alt="미리보기"
                class="w-full h-full object-cover" />
            </div>
            <div v-else class="text-gray-500">
              <i class="fas fa-cloud-upload-alt text-5xl mb-4"></i>
              <p>이미지를 선택하세요</p>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <button
              @click="saveImage"
              class="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
              <i class="fas fa-save"></i>
              저장
            </button>
            <button
              @click="closeImageModal"
              class="px-6 py-3 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors">
              <i class="fas fa-times"></i>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const profileImage = ref("/images/default-avatar.png");
const showImageModal = ref(false);
const driverName = ref("홍길동");
const driverPhone = ref("010-1234-5678");
const driverEmail = ref("driver@example.com");
const vehicleInfo = ref("현대 그랜저 (12가 3456)");
const isEditing = ref(false);
const imagePreview = ref(null);
const fileInput = ref(null);
const averageRating = ref(4.8);
// 이미지 업로드 모달 열기
const uploadImage = () => {
  showImageModal.value = true;
};
// 이미지 모달 닫기
const closeImageModal = () => {
  showImageModal.value = false;
};
// 파일선택 다이얼로그 트리거
// 숨겨진 파일 입력 요소를 클릭하여 파일 선택 창 열기
const triggerFileInput = () => {
  fileInput.value.click();
};
// /선택된 이미지 파일을 base64형식으로 변환하여 미리보기 표기
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
// 프로필 이미지 저장
const saveImage = () => {
  if (imagePreview.value) {
    profileImage.value = imagePreview.value;
  }
  closeImageModal();
};
// 프로필 수정 모드 시작
const startEditing = () => {
  isEditing.value = true;
};
const saveProfile = () => {
  // 실제 API 호출 로직 추가 예정
  const profile = {
    name: driverName.value,
    phone: driverPhone.value,
    email: driverEmail.value,
    vehicle: vehicleInfo.value,
  };
  alert(
    `프로필 저장 완료 :이름 : ${profile.name}전화번호 : ${profile.phone} 이메일:${profile.email} 차랑종류:${profile.vehicle}`
  );
  isEditing.value = false;
};
const cancelEditing = () => {
  driverName.value = oring.value.name;
  driverPhone.value = oring.value.phone;
  driverEmail.value = oring.value.email;
  vehicleInfo.value = oring.value.vehicle;
  isEditing.value = false;
};
const oring = ref({
  name: driverName.value,
  phone: driverPhone.value,
  email: driverEmail.value,
  vehicle: vehicleInfo.value,
});
// const start = () => {
//   oring.value = {
//     name: driverName.value,
//     phone: driverPhone.value,
//     email: driverEmail.value,
//     vehicle: vehicleInfo.value,
//   };
//   isEditing.value = true;
// };
</script>
