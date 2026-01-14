<script setup lang="ts">
import PlaneIcon from "@/assets/icons/plane.svg";
import MapIcon from "@/assets/icons/map.svg";
import CameraIcon from "@/assets/icons/camera.svg";
</script>

<template>
  <div
    class="w-full flex items-center justify-center lg:justify-between gap-3 px-12"
  >
    <!-- //plane container -->
    <div class="flex flex-col w-14 h-14 bg-blue-100 rounded-2xl pt-3 px-3">
      <div class="relative h-8">
        <div class="w-6 h-6 left-1 top-[3.75px] absolute">
          <img :src="PlaneIcon" alt="plane" />
        </div>
      </div>
    </div>
    <!-- //map container -->
    <div class="flex flex-col w-14 h-14 bg-purple-100 rounded-2xl pt-3 px-3">
      <div class="relative h-8">
        <div class="w-6 h-6 left-1 top-[3.75px] absolute">
          <img :src="MapIcon" alt="plane" />
        </div>
      </div>
    </div>
    <!-- //camera container -->
    <div class="flex flex-col w-14 h-14 bg-pink-100 rounded-2xl pt-3 px-3">
      <div class="relative h-8">
        <div class="w-6 h-6 left-1 top-[3.75px] absolute">
          <img :src="CameraIcon" alt="plane" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
