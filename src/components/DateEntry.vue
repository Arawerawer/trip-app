<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToTrip = () => {
  router.push("/trip");
};
</script>

<template>
  <button
    @click="goToTrip"
    class="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg py-3 text-center text-white text-lg font-medium font-['Inter'] leading-7 transition-all duration-700 ease-out cursor-pointer"
  >
    開始規劃行程
  </button>
</template>

<style scoped></style>
