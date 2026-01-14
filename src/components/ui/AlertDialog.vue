<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTripInputStore } from "@/store/tripInput";
import TrashIcon from "@/assets/icons/trash-icon-white.svg";

const router = useRouter();
const tripInputStore = useTripInputStore();

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const handleConfirm = () => {
  // 重置 store 所有資料
  tripInputStore.resetStore();
  // 使用 router 導航回首頁
  router.push("/");
  close();
};
</script>

<template>
  <!-- 觸發按鈕 -->
  <button
    @click="open"
    class="w-7 h-7 p-[6.007px] rounded-lg flex justify-center items-center right-0 absolute cursor-pointer hover:opacity-80 hover:bg-blue-400 transition-opacity"
  >
    <img :src="TrashIcon" alt="trash" />
  </button>

  <!-- 對話框遮罩 - 使用 Teleport 傳送到 body -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="close"
    >
      <!-- 對話框內容 -->
      <div
        class="w-96 p-6 bg-white rounded-[10px] shadow-lg outline-1 outline-offset-[-1.05px] outline-black/10 flex flex-col justify-center items-center gap-4"
        @click.stop
      >
        <div class="w-full flex flex-col justify-center items-center gap-2">
          <div class="w-full flex justify-center items-center">
            <div
              class="text-center text-gray-900 text-xl font-semibold font-['Inter'] leading-7"
            >
              清除所有行程？
            </div>
          </div>

          <div class="w-full flex justify-center items-center">
            <div
              class="text-center text-gray-600 text-base font-normal font-['Inter'] leading-6"
            >
              所有資料將被刪除且無法復原
            </div>
          </div>
        </div>

        <div
          class="w-full h-20 flex flex-col justify-center items-center gap-2"
        >
          <button
            @click="handleConfirm"
            class="w-full px-4 py-2 bg-red-600 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-red-700 transition-colors"
          >
            <div
              class="text-center text-white text-sm font-medium font-['Inter'] leading-5"
            >
              確定清除
            </div>
          </button>

          <button
            @click="close"
            class="w-full px-4 py-2 bg-gray-100 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <div
              class="text-center text-gray-700 text-sm font-medium font-['Inter'] leading-5"
            >
              取消
            </div>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
