<script setup lang="ts">
import { ref, computed } from "vue";
import Time from "@/components/ui/Time.vue";
import TimeIcon from "@/assets/icons/time.svg";
import { formatTime } from "@/utils/timeFormatter";

interface TimeValue {
  hours: number;
  minutes: number;
}

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isTimePickerOpen = ref(false);
const isClosing = ref(false);
const selectedTime = ref<TimeValue | null>(null);

const openTimePicker = () => {
  isTimePickerOpen.value = true;
  isClosing.value = false;
};

const closeTimePicker = () => {
  isClosing.value = true;
};

const handleTimeChange = (time: TimeValue | null) => {
  selectedTime.value = time;
  if (time) {
    const timeString = formatTime(time);
    emit("update:modelValue", timeString);
  }
  closeTimePicker();
};

const handleAnimationEnd = () => {
  if (isClosing.value) {
    isTimePickerOpen.value = false;
    isClosing.value = false;
  }
};

const displayText = computed(() => {
  if (props.modelValue) return props.modelValue;
  return formatTime(selectedTime.value);
});
</script>

<template>
  <!-- 自訂外觀 -->
  <button
    @click="openTimePicker"
    class="w-full px-3 py-2 bg-white rounded-lg outline-1 -outline-offset-1 outline-black/10 flex justify-start items-center gap-4 hover:bg-gray-100 cursor-pointer"
  >
    <img :src="TimeIcon" alt="time" />
    <div class="text-neutral-950 text-sm font-medium font-['Inter'] leading-5">
      {{ displayText }}
    </div>
  </button>

  <!-- Dialog 遮罩 -->
  <Teleport to="body">
    <div
      v-if="isTimePickerOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
      :class="{ 'bg-black/50': !isClosing }"
      @click="closeTimePicker"
    >
      <!-- 時間選擇器 dialog -->
      <div
        :class="isClosing ? 'roll-out-left' : 'roll-in-left'"
        @animationend="handleAnimationEnd"
        @click.stop
      >
        <Time
          :value="selectedTime"
          :onChange="handleTimeChange"
          :onCancel="closeTimePicker"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.roll-in-left {
  -webkit-animation: roll-in-left 0.6s ease-out both;
  animation: roll-in-left 0.6s ease-out both;
}

@keyframes roll-in-left {
  0% {
    -webkit-transform: translateX(-800px) rotate(-540deg);
    transform: translateX(-800px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

.roll-out-left {
  -webkit-animation: roll-out-left 0.6s ease-in both;
  animation: roll-out-left 0.6s ease-in both;
}

@keyframes roll-out-left {
  0% {
    -webkit-transform: translateX(0) rotate(0deg);
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px) rotate(-540deg);
    transform: translateX(-1000px) rotate(-540deg);
    opacity: 0;
  }
}
</style>
