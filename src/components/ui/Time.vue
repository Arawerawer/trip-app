<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface TimeValue {
  hours: number;
  minutes: number;
}

interface TimeProps {
  value: TimeValue | null;
  onChange?: (time: TimeValue | null) => void;
  onCancel?: () => void;
}

const props = defineProps<TimeProps>();
</script>

<template>
  <VueDatePicker
    :model-value="value"
    @update:model-value="onChange"
    inline
    time-picker
  >
    <template #action-row="{ selectDate }">
      <div class="action-row-container">
        <button
          @click="selectDate"
          class="w-full px-4 py-2 bg-gray-950 rounded-lg text-white text-sm font-medium font-['Inter'] leading-5 hover:bg-gray-800 cursor-pointer"
        >
          選擇
        </button>

        <button
          @click="onCancel"
          class="w-full px-4 py-2 bg-white rounded-lg outline-1 -outline-offset-1 outline-black/10 text-neutral-950 text-sm font-medium font-['Inter'] leading-5 hover:bg-gray-100 cursor-pointer"
        >
          取消
        </button>
      </div>
    </template>
  </VueDatePicker>
</template>

<style scoped>
.action-row-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}

:deep(.dp__theme_light) {
  --dp-border-radius: 10px;
}

/* 調整 VueDatePicker 的尺寸 */
</style>
