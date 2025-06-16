<template>
  <div
    class="space-y-6 text-gray-800 dark:bg-black dark:text-gray-200 p-4 rounded">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          예약 관리
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          예약 정보를 관리하고 상태를 확인할 수 있습니다.
        </p>
      </div>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <i class="fas fa-calendar-check text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              전체 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              24건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+5건</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <i class="fas fa-check-circle text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              확정 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              18건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+3건</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div
            class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
            <i class="fas fa-clock text-xl md:text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              대기 예약
            </h3>
            <p
              class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
              6건
            </p>
            <span class="text-sm text-green-600 dark:text-green-400">+2건</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div
        class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between md:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleInput"
              placeholder="고객명 또는 예약번호로 검색"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <i
              class="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <select
            v-model="statusFilter"
            class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="all">전체 상태</option>
            <option value="confirmed">확정</option>
            <option value="pending">대기</option>
            <option value="cancelled">취소</option>
          </select>
          <select
            v-model="sortBy"
            class="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="date-desc">날짜순 (최신순)</option>
            <option value="date-asc">날짜순 (오래된순)</option>
            <option value="name-asc">이름순</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 예약 목록 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
          예약 목록
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                예약번호
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                고객명
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                예약일시
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                희망일시
              </th>

              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody
            v-for="reservation in paginatedReservations"
            :key="reservation.id"
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                #{{ reservation.id }}
              </td>
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                {{ reservation.user }}
              </td>
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ reservation.phone }}
              </td>
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ formatDate(reservation.date) }} {{ reservation.time }}
              </td>
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ formatDate(reservation.preferredDate) }}
                {{ reservation.preferredTime }}
              </td>

              <td class="px-4 md:px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(reservation.status)"
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(reservation.status) }}
                </span>
              </td>
              <td
                class="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                  @click="showReservationDetails(reservation)">
                  <i class="fas fa-eye mr-1"></i>상세
                </button>
                <button
                  v-if="reservation.status !== 'cancelled'"
                  @click="comfirmCancel(reservation)"
                  class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                  <i class="fas fa-ban mr-1"></i>취소
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      class="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4 gap-4">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        총 <span class="font-medium">{{ filteredReservations.length }}</span
        >건의 예약
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          v-for="page in totalPages"
          key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 border rounded',
            currentPage === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
          ]">
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 예약 상세 모달 -->
    <div
      v-if="selectedReservation"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              예약 상세 정보
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 기본 정보 -->
            <div class="space-y-6">
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  기본 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >예약번호</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white"
                      >#{{ selectedReservation.id }}</span
                    >
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >상태</label
                    >
                    <span
                      :class="getStatusClass(selectedReservation.status)"
                      class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ getStatusText(selectedReservation.status) }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >카페명</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.cafeName
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >사업자등록번호</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.businessNumber
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >회원명</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.user
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >연락처</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.phone
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >이메일</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.email
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- 제빙기 정보 -->
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  제빙기 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >모델명</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      selectedReservation.modelName
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >견적금액</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white"
                      >{{ selectedReservation.estimatedPrice }}원</span
                    >
                  </div>
                  <div class="space-y-2">
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >제빙기 사진</label
                    >
                    <div class="grid grid-cols-3 gap-2">
                      <div
                        class="relative"
                        v-for="(photo, index) in selectedReservation.photos"
                        :key="index">
                        <img
                          :src="photo"
                          class="w-full h-32 object-cover rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 일정 및 기타 정보 -->
            <div class="space-y-6">
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  일정 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >접수일시</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      formatDate(selectedReservation.createdAt)
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >희망일시</label
                    >
                    <span class="text-sm text-gray-900 dark:text-white">{{
                      formatDate(selectedReservation.preferredDateTime)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- 담당 정보 -->
              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  담당 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label
                      class="w-32 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >담당기사</label
                    >
                    <div class="flex-1 relative">
                      <input
                        type="text"
                        readonly
                        v-model="technicianSearch"
                        @click="openTechnicianSearchModal"
                        placeholder="기사 검색"
                        class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                      <i
                        class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  추가 정보
                </h4>
                <div class="space-y-2">
                  <div>
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >요구사항</label
                    >
                    <p class="mt-1 text-sm text-gray-900 dark:text-white">
                      {{ selectedReservation.requirements }}
                    </p>
                  </div>
                  <div>
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >특별 요청사항</label
                    >
                    <p class="mt-1 text-sm text-gray-900 dark:text-white">
                      {{ selectedReservation.specialRequests }}
                    </p>
                  </div>
                  <div>
                    <label
                      class="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >메모</label
                    >
                    <p class="mt-1 text-sm text-gray-900 dark:text-white">
                      {{ selectedReservation.memo }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
            닫기
          </button>
          <button
            @click="saveTechnicianAssingnment"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            기사 배정 저장
          </button>
        </div>
      </div>
    </div>

    <!-- 취소 확인 모달 -->
    <div
      v-if="showCancelModal"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">예약 취소 확인</h3>
            <button
              @click="closeCancelModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-900">
            정말로 이 예약을 취소하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 mt-1">
            취소된 예약은 복구할 수 없습니다.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeCancelModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            아니오
          </button>
          <button
            @click="cancelReservation"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            예, 취소합니다
          </button>
        </div>
      </div>
    </div>

    <!-- 기사 검색 모달 -->
    <div
      v-if="showTechnicianSearchModal"
      class="modal fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">기사 검색</h3>
            <button
              class="text-gray-400 hover:text-gray-500"
              @click="closeTechnicianSearchModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6 text-gray-700">
          <!-- 검색 조건 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >구분</label
              >
              <select
                v-model="technicianSearchFilter.type"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="executive">임원</option>
                <option value="employee">사원</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >정산율</label
              >
              <select
                v-model="technicianSearchFilter.settlementRate"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="70">70%</option>
                <option value="75">75%</option>
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >활동지역</label
              >
              <select
                v-model="technicianSearchFilter.area"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="seoul">서울</option>
                <option value="gyeonggi">경기</option>
                <option value="incheon">인천</option>
                <option value="busan">부산</option>
              </select>
            </div>
          </div>

          <!-- 검색어 입력 -->
          <div class="mb-6">
            <div class="relative">
              <input
                v-model="technicianSearchFilter.keyword"
                @input="handleInput1"
                type="text"
                placeholder="기사명 또는 전화번호로 검색"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <!-- 기사 목록 테이블 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기사명
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구분
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    휴대전화
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산율
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    활동지역
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선택
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="tech in paginatedTechnicians"
                :key="tech.id"
                class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getTechnicianTypeText(tech.type) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.phone }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.settlementRate }}%
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getAreaText(tech.area) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="selectTechnician(tech)"
                      class="text-indigo-600 hover:text-indigo-900">
                      선택
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 페이지네이션 -->
          <div class="flex justify-between items-center mt-6">
            <div class="text-sm text-gray-700">
              총
              <span class="font-medium">{{ filteredTechnicians.length }}</span
              >명의 기사
            </div>
            <div class="flex gap-2">
              <button
                :disabled="currentTechnicianPage === 1"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button
                v-for="page in totalTechnicianPages"
                :key="page"
                @click="goToTechnicianPage(page)"
                :class="[
                  'px-3 py-1 border rounded',
                  currentTechnicianPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 hover:bg-gray-50',
                ]">
                {{ page }}
              </button>
              <button
                :disabled="currentTechnicianPage === totalTechnicianPages"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
// 기사 검색 관련 상태
const searchQuery = ref("");
const showTechnicianSearchModal = ref(false);
const selectedReservation = ref(null);
const showCancelModal = ref(false);
const statusFilter = ref("all");
const sortBy = ref("date-desc");
// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value; //입력된 값을 searchQuery에 반영
}
// 예약목록

const reservations = ref([
  {
    id: 1,
    user: "김철수",
    date: "2024-04-10",
    time: "18:00",
    preferredDate: "2024-04-10",
    preferredTime: "18:00",
    phone: "010-1234-5678",
    email: "kim@example.com",
    status: "confirmed",
    specialRequests: "창가 자리로 부탁드립니다.",
    cafeName: "Hcoffee",
  },
  {
    id: 2,
    user: "이영희",
    date: "2024-04-11",
    time: "19:30",
    preferredDate: "2024-04-11",
    preferredTime: "19:30",
    phone: "010-8765-4321",
    email: "lee@example.com",
    status: "pending",
    specialRequests: "",
  },
  {
    id: 3,
    user: "박민수",
    date: "2024-04-12",
    time: "20:00",
    preferredDate: "2024-04-12",
    preferredTime: "20:00",
    phone: "010-1111-2222",
    email: "park@example.com",
    status: "cancelled",
    specialRequests: "생일 케이크 준비 부탁드립니다.",
  },
  {
    id: 4,
    user: "최지영",
    date: "2024-04-13",
    time: "17:30",
    preferredDate: "2024-04-13",
    preferredTime: "17:30",
    phone: "010-3333-4444",
    email: "choi@example.com",
    status: "confirmed",
    specialRequests: "유아용 의자 필요합니다.",
  },
  {
    id: 5,
    user: "정민호",
    date: "2024-04-14",
    time: "19:00",
    preferredDate: "2024-04-14",
    preferredTime: "19:00",
    phone: "010-5555-6666",
    email: "jung@example.com",
    status: "pending",
    specialRequests: "단체석으로 부탁드립니다.",
  },
  {
    id: 6,
    user: "한수진",
    date: "2024-04-15",
    time: "18:30",
    preferredDate: "2024-04-15",
    preferredTime: "18:30",
    phone: "010-7777-8888",
    email: "han@example.com",
    status: "confirmed",
    specialRequests: "알레르기 주의사항: 땅콩 알레르기",
  },
  {
    id: 7,
    user: "송지훈",
    date: "2024-04-16",
    time: "20:30",
    preferredDate: "2024-04-16",
    preferredTime: "20:30",
    phone: "010-9999-0000",
    email: "song@example.com",
    status: "pending",
    specialRequests: "",
  },
  {
    id: 8,
    user: "강미영",
    date: "2024-04-17",
    time: "19:00",
    preferredDate: "2024-04-17",
    preferredTime: "19:00",
    phone: "010-2222-3333",
    email: "kang@example.com",
    status: "confirmed",
    specialRequests: "휠체어 접근 가능한 자리로 부탁드립니다.",
  },
  {
    id: 9,
    user: "임동현",
    date: "2024-04-18",
    time: "18:00",
    preferredDate: "2024-04-18",
    preferredTime: "18:00",
    phone: "010-4444-5555",
    email: "lim@example.com",
    status: "pending",
    specialRequests: "단체석으로 부탁드립니다.",
  },
  {
    id: 10,
    user: "오서연",
    date: "2024-04-19",
    time: "19:30",
    preferredDate: "2024-04-19",
    preferredTime: "19:30",
    phone: "010-6666-7777",
    email: "oh@example.com",
    status: "confirmed",
    specialRequests: "창가 자리로 부탁드립니다.",
  },
]);
// 필터링 기능
const filteredReservations = computed(() => {
  let result = [...reservations.value];
  //   검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (r) =>
        r.user.toLowerCase().includes(query) || r.id.toString().includes(query) //숫자를 문자열로 바꿈
    );
  }
  // 상태필터링
  if (statusFilter.value !== "all") {
    result = result.filter((r) => r.status === statusFilter.value);
  }
  // 정렬 필터링
  // 정렬 기준(sortBy.vlaue)에 따라 결과를 정렬
  switch (sortBy.value) {
    // 날짜 오름순 정렬(예:오래된 순 => 최신순)
    case "date-asc":
      // sort()배열을 정렬함수
      result.sort((a, b) => {
        // console.log("비교중 (오름차순):");
        // console.log("a:", a);
        // console.log("b:", b);
        return new Date(a.date) - new Date(b.date);
      });
      break;
    case "date-desc":
      // sort()배열을 정렬함수
      result.sort((a, b) => {
        // console.log("비교중 (내림차순):");
        // console.log("a:", a);
        // console.log("b:", b);
        return new Date(b.date) - new Date(a.date);
      });
      break;
    // 이름 오름차순 정렬(예 :가나다 순)
    case "name-asc":
      // localeCompare()는 문자열을 알파벳이나 한글 순서레 따라 정렬할때 사용
      result.sort((a, b) => a.user.localeCompare(b.user)); //문자열 비교
      break;
  }
  return result;
});
// 페이지네이션 기능
const currentPage = ref(1);
const itemsPerPage = ref(5);
// 페이지 계산
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / itemsPerPage.value);
});
// 페이지네이션 예약목록 출력
const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredReservations.value.slice(start, end);
});
// 다음페이지
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
// 이전페이지
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
// 해당하는 페이지이동
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
// 날짜 수정
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};
// 상태 글자 변환
const getStatusText = (status) => {
  const statusMap = {
    confirmed: "확정",
    pending: "대기",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};
// 상태 클래스 적용
const getStatusClass = (status) => {
  const statusClasses = {
    confirmed:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
    pending:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
    cancelled: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
  };
  return (
    statusClasses[status] ||
    "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300"
  );
};

// 상세내용

const showReservationDetails = (reservation) => {
  selectedReservation.value = {
    ...reservation, //기존 예약 데이터를 모두 복사
    // 카페이름이 없으면 "카페명 미입력" 으로 설정
    // 카페 이름이 없으면 "카페명 미입력"으로 설정
    cafeName: reservation.cafeName || "카페명 미입력",

    // 사업자번호가 없으면 "사업자번호 미입력"으로 설정
    businessNumber: reservation.businessNumber || "사업자번호 미입력",

    // 모델명이 없으면 "모델명 미입력"으로 설정
    modelName: reservation.modelName || "모델명 미입력",

    // 예상 금액이 없으면 "0"으로 설정
    estimatedPrice: reservation.estimatedPrice || "0",
    // 생성일이 없으면 현재 날짜와 시간으로 설정 (ISO 포맷, 'yyyy-mm-ddThh:mm')
    createdAt: reservation.createdAt || new Date().toISOString().slice(0, 16),

    // 희망 시간도 없으면 현재 날짜와 시간으로 설정 (ISO 포맷, 'yyyy-mm-ddThh:mm')
    preferredDateTime:
      reservation.preferredDateTime || new Date().toISOString().slice(0, 16),

    // 사진이 없으면 기본 이미지 3개로 설정
    photos: reservation.photos || [
      "/images/ice_cream.jpg",
      "/images/ice_cream2.jpg",
      "/images/ice_cream3.png",
    ], // 요구사항이 없으면 "요구사항 없음"으로 설정
    requirements: reservation.requirements || "요구사항 없음",

    // 메모가 없으면 "메모 없음"으로 설정
    memo: reservation.memo || "메모 없음",

    // 지정된 기사가 없으면 null로 설정 (아직 배정되지 않은 상태)
    technician: reservation.technician || null,

    // 이메일이 없으면 "이메일 미입력"으로 설정
    email: reservation.email || "이메일 미입력",

    // 특별 요청사항이 없으면 "특별 요청사항 없음"으로 설정
    specialRequests: reservation.specialRequests || "특별 요청사항 없음",
  };
};
// 모달창 닫기 함수
const closeModal = () => {
  selectedReservation.value = null;
};
// 기사 검색 모달 열기
const openTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = true;
};
// 기사 검색 모달 닫기
const closeTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = false; //모달 숨기기;
};
// 기사 검색 관련 상태
const technicianSearchFilter = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});
// 기사 목록
const technicians = ref([
  {
    id: 1,
    name: "김기사",
    type: "executive",
    phone: "010-1111-2222",
    settlementRate: 80,
    area: "seoul",
  },
  {
    id: 2,
    name: "이기사",
    type: "employee",
    phone: "010-3333-4444",
    settlementRate: 75,
    area: "gyeonggi",
  },
  {
    id: 3,
    name: "박기사",
    type: "executive",
    phone: "010-5555-6666",
    settlementRate: 85,
    area: "incheon",
  },
  {
    id: 4,
    name: "최기사",
    type: "employee",
    phone: "010-7777-8888",
    settlementRate: 70,
    area: "busan",
  },
  {
    id: 5,
    name: "정기사",
    type: "executive",
    phone: "010-9999-0000",
    settlementRate: 90,
    area: "seoul",
  },
  {
    id: 6,
    name: "강기사",
    type: "employee",
    phone: "010-2222-3333",
    settlementRate: 75,
    area: "gyeonggi",
  },
  {
    id: 7,
    name: "조기사",
    type: "executive",
    phone: "010-4444-5555",
    settlementRate: 80,
    area: "incheon",
  },
  {
    id: 8,
    name: "윤기사",
    type: "employee",
    phone: "010-6666-7777",
    settlementRate: 85,
    area: "busan",
  },
  {
    id: 9,
    name: "장기사",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "seoul",
  },
  {
    id: 10,
    name: "임기사",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gyeonggi",
  },
]);
// 기사 페이지 네이션 관련 상태
const currentTechnicianPage = ref(1);
const techniciansPerPage = ref(5);
const technicianSearch = ref("");
// 필터릴된 기사 목록
// computed로 필터링된 기사 리스크를 계산함
const filteredTechnicians = computed(() => {
  return technicians.value.filter((tech) => {
    // 타입이(type)dl "all" 이면 모두 포함 ,아니면 선택한 타입과 같은 기사만 포함
    const matchesType =
      technicianSearchFilter.value.type === "all" ||
      tech.type === technicianSearchFilter.value.type;
    //정산비율이(settlementRate) "all"이면 모두 포함, 아니면 선택한 비율과 같은 기사만 포함
    const matchesRate =
      technicianSearchFilter.value.settlementRate === "all" ||
      tech.settlementRate.toString() ===
        technicianSearchFilter.value.settlementRate;
    // 지역에 (area)"all"이면 모두 포삼, 아니면 선택한 지역과 같은 기사만 포함
    const matchesArea =
      technicianSearchFilter.value.area === "all" ||
      tech.area === technicianSearchFilter.value.area;
    // 키워드가 비어있으면 모두 포함 아니면 이름이나 전화번호에 키워드가 포함된 기사만 출력
    const matchesKeyword =
      !technicianSearchFilter.value.keyword || //키워드가 없으면 true
      tech.name.includes(technicianSearchFilter.value.keyword) || //이름에 키워드 포함
      tech.phone.includes(technicianSearchFilter.value.keyword); //전화번호에 키워드 포함
    //  위 4가지 조건을 모두 만족하는 기사만 필터링해서 반환

    return matchesType && matchesRate && matchesArea && matchesKeyword;
  });
});

// 기사페이지네이션
const totalTechnicianPages = computed(() => {
  return Math.ceil(filteredTechnicians.value.length / techniciansPerPage.value);
});
// 현재 페이지에 보여줄 기사 목록
const paginatedTechnicians = computed(() => {
  // 시작인덱스
  const start = (currentTechnicianPage.value - 1) * techniciansPerPage.value;

  // 끝 인덱스
  const end = start + techniciansPerPage.value;
  return filteredTechnicians.value.slice(start, end);
});
//
const goToTechnicianPage = (page) => {
  if (page >= 1 && page <= totalTechnicianPages.value) {
    currentTechnicianPage.value = page;
  }
};
// 기사 유형 텍스트 변환
const getTechnicianTypeText = (type) => {
  const typeMap = {
    executive: "임원",
    employee: "사원",
  };
  return typeMap[type] || type;
};
// 지역 텍스트 변환
const getAreaText = (area) => {
  const areaMap = {
    seoul: "서울",
    gyeonggi: "경기",
    incheon: "인천",
    busan: "부산",
  };
  return areaMap[area] || area;
};
// 기사 선택시 실행되는 함수

const selectTechnician = (technician) => {
  selectedReservation.value.technician = technician; //예약정보에 선택한 기사 저장
  technicianSearch.value = technician.name;
  closeTechnicianSearchModal();
};
//기사 배정 저장 클릭시
const saveTechnicianAssingnment = () => {
  if (!selectedReservation.value.technician) {
    alert("담당 기사를 선택해주세요.");
    return;
  }
  // 기사 배정 저장 로직
  const index = reservations.value.findIndex(
    (r) => r.id === selectedReservation.value.id
  );
  if (index !== -1) {
    reservations.value[index].technician = selectedReservation.value.technician;
    alert(
      `기사 배정이 완료되었습니다.\n배정된 기사:${selectedReservation.value.technician.name}\n예약번호:${selectedReservation.value.id}\n연락드리는 기사에게 예약번호를 알려주세요.
      
      `
    );
  }
  closeModal();
};

// 기사검색 한글이슈
function handleInput1(event) {
  technicianSearchFilter.value.keyword = event.target.value;
}
// 취소관련기능
const comfirmCancel = (reservation) => {
  // console.log(reservation);
  showCancelModal.value = true;
  reservationToCancel.value = reservation;
};
// 취소확인에서 닫기 버튼클릭시
const closeCancelModal = () => {
  showCancelModal.value = false;
  reservationToCancel.value = null;
};
const reservationToCancel = ref(null);
// 실제로 예약을 취소하는 기능
const cancelReservation = () => {
  if (reservationToCancel.value) {
    const index = reservations.value.findIndex(
      (r) => r.id === reservationToCancel.value.id
    );
    // console.log(index);
    console.log(reservations.value[index].status);
    // 해당 예약이 목록에 존재하면 (인덱스가 -1아니면)
    if (index !== -1) {
      reservations.value[index].status = "cancelled";
    }
    console.log(reservations.value[index].status);
  }
  closeCancelModal();
};
</script>
