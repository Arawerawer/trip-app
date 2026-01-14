<script setup lang="ts">
import PlusWhite from "@/assets/icons/plus-white.svg";

const props = defineProps<{
  dayNumber: number;
}>();
</script>

<template>
  <button
    class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg flex justify-center items-center gap-4 cursor-pointer"
  >
    <div class="w-5 h-5">
      <img :src="PlusWhite" alt="add day" />
    </div>

    <div
      class="text-center text-white text-sm font-medium font-['Inter'] leading-5"
    >
      新增 Day {{ dayNumber }}
    </div>
  </button>
</template>

<style scoped></style>
