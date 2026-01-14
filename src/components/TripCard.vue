<script setup lang="ts">
import { computed } from "vue";
import TrashIconRed from "@/assets/icons/trash-Icon-red.svg";
import AddTripButton from "@/components/AddTripButton.vue";
import SavedTripCard from "@/components/SavedTripCard.vue";
import TripInputCard from "@/components/TripInputCard.vue";
import { useTripInputStore } from "@/store/tripInput";

const props = defineProps<{
  dayId: number;
}>();

const tripInputStore = useTripInputStore();

// 只顯示屬於這一天的行程
const dayTrips = computed(() => tripInputStore.getTripsByDay(props.dayId));

// 判斷是否為新增的卡片
const isNewlyAdded = computed(
  () => tripInputStore.newlyAddedDayId === props.dayId
);

// 判斷是否正在刪除
const isDeleting = computed(() => tripInputStore.deletingDayId === props.dayId);

// 動畫結束後清除標記或執行刪除
const handleAnimationEnd = () => {
  if (isNewlyAdded.value) {
    tripInputStore.newlyAddedDayId = null;
  }
  if (isDeleting.value) {
    tripInputStore.deleteDay(props.dayId);
  }
};

// 開始刪除動畫
const handleDeleteDay = () => {
  tripInputStore.closeTripInput(props.dayId);
  tripInputStore.startDeleteDay(props.dayId);
};

// 計算這一天的日期
const dayDate = computed(() => {
  const startDate = tripInputStore.startDate;
  if (!startDate) return null;

  // 處理字串轉 Date
  const baseDate =
    typeof startDate === "string" ? new Date(startDate) : startDate;

  // Day 1 = startDate, Day 2 = startDate + 1天, 以此類推
  const resultDate = new Date(baseDate);
  resultDate.setDate(baseDate.getDate() + (props.dayId - 1));

  return resultDate;
});

// 格式化日期顯示（例如：12月26日 星期五）
const formattedDate = computed(() => {
  if (!dayDate.value) return "未設定日期";

  const month = dayDate.value.getMonth() + 1;
  const day = dayDate.value.getDate();
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const weekday = weekdays[dayDate.value.getDay()];

  return `${month}月${day}日 ${weekday}`;
});
</script>

<template>
  <div
    :class="{ 'bounce-in-top': isNewlyAdded, 'flip-out-hor-top': isDeleting }"
    class="w-full p-4 bg-white rounded-2xl outline-1 outline-offset-[-1.05px] outline-black/10 flex flex-col justify-center items-center gap-10"
    @animationend="handleAnimationEnd"
  >
    <div class="w-full flex justify-between items-center">
      <div class="flex flex-col justify-center items-center gap-1">
        <div
          class="w-full text-blue-600 text-xl font-medium font-['Inter'] leading-8"
        >
          Day {{ dayId }}
        </div>

        <div
          class="w-full text-gray-500 text-sm font-normal font-['Inter'] leading-5"
        >
          {{ formattedDate }}
        </div>
      </div>

      <button
        @click="handleDeleteDay"
        class="w-9 h-8 rounded-lg flex justify-center items-center hover:bg-rose-200 cursor-pointer"
      >
        <img :src="TrashIconRed" alt="delete" />
      </button>
    </div>

    <template v-for="trip in dayTrips" :key="trip.id">
      <div v-if="tripInputStore.editingTrip?.id === trip.id" class="w-full">
        <TripInputCard :day-id="dayId" />
      </div>
      <SavedTripCard v-else :trip="trip" />
    </template>

    <div
      v-if="tripInputStore.showTripInput[dayId] && !tripInputStore.editingTrip"
      class="w-full slide-in-top"
    >
      <TripInputCard :day-id="dayId" />
    </div>

    <AddTripButton
      v-if="!tripInputStore.showTripInput[dayId] && !tripInputStore.editingTrip"
      @click="tripInputStore.openTripInput(dayId)"
    />
  </div>
</template>

<style scoped>
.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.bounce-in-top {
  -webkit-animation: bounce-in-top 1.1s both;
  animation: bounce-in-top 1.1s both;
}

@keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
/* 刪除 */
.flip-out-hor-top {
  -webkit-animation: flip-out-hor-top 1s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: flip-out-hor-top 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes flip-out-hor-top {
  0% {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateX(70deg);
    transform: rotateX(70deg);
    opacity: 0;
  }
}
</style>
