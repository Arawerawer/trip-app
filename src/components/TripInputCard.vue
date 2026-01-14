<script setup lang="ts">
import { ref, watch } from "vue";
import TimeSelectButton from "@/components/ui/TimeSelectButton.vue";
import { useTripInputStore } from "@/store/tripInput";

const props = defineProps<{
  dayId: number;
}>();

const tripInputStore = useTripInputStore();

const tripName = ref("");
const tripTime = ref("");
const tripLocation = ref("");

// 監聽編輯狀態，當進入編輯模式時填充表單
watch(
  () => tripInputStore.editingTrip,
  (editingTrip) => {
    if (editingTrip) {
      tripName.value = editingTrip.name;
      tripTime.value = editingTrip.time;
      tripLocation.value = editingTrip.location;
    } else {
      tripName.value = "";
      tripTime.value = "";
      tripLocation.value = "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  tripInputStore.saveTrip({
    dayId: props.dayId,
    name: tripName.value,
    time: tripTime.value,
    location: tripLocation.value,
  });
  // 清空表單
  tripName.value = "";
  tripTime.value = "";
  tripLocation.value = "";
};

const scrollToInput = (event: FocusEvent) => {
  setTimeout(() => {
    (event.target as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 300);
};
</script>

<template>
  <div
    class="w-full p-3 bg-gray-50 rounded-[10px] flex flex-col justify-center items-center gap-3"
  >
    <input
      v-model="tripName"
      type="text"
      placeholder="行程名稱"
      @focus="scrollToInput"
      class="w-full px-3 py-2 bg-zinc-100 rounded-lg outline-1 -outline-offset-1 outline-black/0 text-sm font-normal font-['Inter'] placeholder:text-gray-500 text-black"
    />

    <TimeSelectButton v-model="tripTime" />

    <input
      v-model="tripLocation"
      type="text"
      placeholder="地點 (選填)"
      @focus="scrollToInput"
      class="w-full px-3 py-2 bg-zinc-100 rounded-lg outline-1 -outline-offset-1 outline-black/0 placeholder:text-gray-500 text-sm text-black font-normal font-['Inter']"
    />

    <div class="w-full flex justify-center items-center gap-2">
      <button
        @click="handleSubmit"
        class="w-full px-4 py-2 bg-gray-950 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-800 cursor-pointer"
      >
        <div
          class="text-center text-white text-sm font-medium font-['Inter'] leading-5"
        >
          確定
        </div>
      </button>

      <button
        @click="tripInputStore.closeTripInput(props.dayId)"
        class="w-full px-4 py-2 bg-white rounded-lg outline-1 -outline-offset-1 outline-black/10 flex justify-center items-center gap-2 hover:bg-gray-100 cursor-pointer"
      >
        <div
          class="text-center text-neutral-950 text-sm font-medium font-['Inter'] leading-5"
        >
          取消
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
