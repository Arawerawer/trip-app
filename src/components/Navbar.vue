<script setup lang="ts">
import AlertDialog from "@/components/ui/AlertDialog.vue";
</script>

<template>
  <div
    class="w-full h-24 px-4 pb-1 bg-linear-to-r from-blue-600 to-blue-500 shadow-md flex flex-col justify-end items-center fixed top-0 left-0 z-10"
  >
    <div class="w-full flex justify-center items-center relative">
      <div
        class="text-center text-white text-xl font-medium font-['Inter'] leading-7"
      >
        旅遊行程規劃
      </div>

      <AlertDialog />
    </div>
  </div>
</template>

<style scoped></style>
