<script setup lang="ts">
import TimeIcon from "@/assets/icons/time.svg";
import PenIcon from "@/assets/icons/pen.svg";
import PenBlueIcon from "@/assets/icons/pen-blue.svg";
import TrashGrayIcon from "@/assets/icons/trash-gray.svg";
import TrashRedIcon from "@/assets/icons/trash-Icon-red.svg";
import MapGreenIcon from "@/assets/icons/map-green.svg";
import MapBlueIcon from "@/assets/icons/map-blue.svg";
import type { Trip } from "@/store/tripInput";
import { useTripInputStore } from "@/store/tripInput";

const props = defineProps<{
  trip: Trip;
}>();

const tripInputStore = useTripInputStore();

const handleDelete = () => {
  tripInputStore.startDeleteTrip(props.trip.id);
};

const handleAnimationEnd = () => {
  if (tripInputStore.deletingTripId === props.trip.id) {
    tripInputStore.deleteTrip(props.trip.id);
  }
};

const handleEdit = () => {
  tripInputStore.startEditTrip(props.trip);
};

const openGoogleMaps = () => {
  const query = encodeURIComponent(props.trip.location);
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
    "_blank"
  );
};
</script>

<template>
  <div
    :class="{ 'bounce-out-top': tripInputStore.deletingTripId === trip.id }"
    @animationend="handleAnimationEnd"
    class="w-full p-4 bg-white rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] outline-1 outline-offset-[-1.05px] outline-gray-200 flex flex-col justify-center items-center gap-3"
  >
    <div class="w-full flex justify-between items-center">
      <div
        class="text-gray-900 text-lg font-medium font-['Inter'] leading-7 wrap-break-word overflow-hidden"
      >
        {{ trip.name }}
      </div>

      <div class="flex justify-center items-center gap-1">
        <button
          @click="handleEdit"
          class="group w-9 h-8 rounded-lg flex justify-center items-center hover:bg-blue-200 cursor-pointer"
        >
          <img :src="PenIcon" alt="pen" class="group-hover:hidden" />
          <img :src="PenBlueIcon" alt="pen" class="hidden group-hover:block" />
        </button>

        <button
          @click="handleDelete"
          class="group w-9 h-8 rounded-lg flex justify-center items-center hover:bg-rose-200 cursor-pointer"
        >
          <img :src="TrashGrayIcon" alt="trash" class="group-hover:hidden" />
          <img
            :src="TrashRedIcon"
            alt="trash"
            class="hidden group-hover:block"
          />
        </button>
      </div>
    </div>

    <div class="w-full flex justify-start items-center gap-2">
      <div
        class="w-6 h-6 px-1.5 pt-1.5 bg-blue-50 rounded-[10px] flex flex-col justify-start items-start"
      >
        <img :src="TimeIcon" alt="time" />
      </div>

      <div class="text-gray-600 text-sm font-normal font-['Inter'] leading-5">
        {{ trip.time }}
      </div>
    </div>

    <div
      v-if="trip.location"
      class="w-full flex justify-start items-center gap-2 relative"
    >
      <div
        className="w-6 h-6 px-1.5 pt-1.5 bg-green-50 rounded-[10px] inline-flex flex-col justify-start items-start flex-shrink-0"
      >
        <img :src="MapGreenIcon" alt="map" />
      </div>

      <div
        class="text-gray-600 text-sm font-normal font-['Inter'] leading-5 wrap-break-word overflow-hidden pr-9"
      >
        {{ trip.location }}
      </div>

      <button
        @click="openGoogleMaps"
        class="w-7 h-6 absolute right-0 rounded-lg flex justify-center items-center hover:bg-blue-200 cursor-pointer"
      >
        <img :src="MapBlueIcon" alt="map" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.bounce-out-top {
  -webkit-animation: bounce-out-top 1.5s both;
  animation: bounce-out-top 1.5s both;
}

@keyframes bounce-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  5% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  15% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  25% {
    -webkit-transform: translateY(-38px);
    transform: translateY(-38px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  52% {
    -webkit-transform: translateY(-75px);
    transform: translateY(-75px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  70% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  85% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-800px);
    transform: translateY(-800px);
    opacity: 0;
  }
}
</style>
