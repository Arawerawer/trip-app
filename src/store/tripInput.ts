import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Trip {
  id: number;
  dayId: number;
  name: string;
  time: string;
  location: string;
}

export const useTripInputStore = defineStore(
  "tripInput",
  () => {
    // State
    const showTripInput = ref<Record<number, boolean>>({});
    const editingTrip = ref<Trip | null>(null);
    const savedTrips = ref<Trip[]>([]);
    const nextId = ref(1);
    const days = ref<number[]>([1]); // 儲存天數列表，預設有 Day 1
    const nextDayId = ref(2); // 下一個天數的 ID
    const startDate = ref<Date | null>(new Date()); // 旅行開始日期，預設為今天
    const newlyAddedDayId = ref<number | null>(null); // 追蹤新增的 Day ID
    const deletingDayId = ref<number | null>(null); // 追蹤正在刪除的 Day ID
    const deletingTripId = ref<number | null>(null); // 追蹤正在刪除的 Trip ID

    // UI Control
    const openTripInput = (dayId: number) => {
      showTripInput.value[dayId] = true;
    };

    const closeTripInput = (dayId: number) => {
      showTripInput.value[dayId] = false;
      editingTrip.value = null;
    };

    // CRUD Operations
    const createTrip = (tripData: Omit<Trip, "id">) => {
      savedTrips.value.push({
        id: nextId.value++,
        dayId: tripData.dayId,
        name: tripData.name || "未命名行程",
        time: tripData.time || "未設定時間",
        location: tripData.location || "",
      });
    };

    const startEditTrip = (trip: Trip) => {
      editingTrip.value = { ...trip };
    };

    const updateTrip = (tripData: Omit<Trip, "id">) => {
      if (!editingTrip.value) return;

      const tripId = editingTrip.value.id;
      const tripIndex = savedTrips.value.findIndex(
        (trip) => trip.id === tripId
      );
      // 安全機制
      if (tripIndex === -1) return;

      savedTrips.value[tripIndex] = {
        id: tripId,
        dayId: tripData.dayId,
        name: tripData.name || "未命名行程",
        time: tripData.time || "未設定時間",
        location: tripData.location || "",
      };
    };

    const startDeleteTrip = (id: number) => {
      deletingTripId.value = id;
    };

    const deleteTrip = (id: number) => {
      savedTrips.value = savedTrips.value.filter((trip) => trip.id !== id);
      deletingTripId.value = null;
    };

    // Day Management
    const startDeleteDay = (dayId: number) => {
      deletingDayId.value = dayId;
    };

    const deleteDay = (dayId: number) => {
      // 刪除該天的所有行程
      savedTrips.value = savedTrips.value.filter(
        (trip) => trip.dayId !== dayId
      );
      // 刪除該天
      days.value = days.value.filter((id) => id !== dayId);
      deletingDayId.value = null;
    };

    // 根據 dayId 過濾行程
    const getTripsByDay = (dayId: number) => {
      return savedTrips.value.filter((trip) => trip.dayId === dayId);
    };

    // 恢復 Day 1（當 Day 1 被刪除時使用）
    const restoreDay1 = () => {
      if (!days.value.includes(1)) {
        days.value.push(1);
        days.value.sort((a, b) => a - b);
        newlyAddedDayId.value = 1;
        // 如果 nextDayId 還是 1，更新為 2
        if (nextDayId.value === 1) {
          nextDayId.value = 2;
        }
      }
    };

    // 檢查指定 Day 之後是否有缺口
    const hasGapAfterDay = (dayId: number) => {
      const currentIndex = days.value.indexOf(dayId);
      const nextDay = days.value[currentIndex + 1];

      if (nextDay && nextDay - dayId > 1) {
        return true;
      }

      return false;
    };

    // 填補指定 Day 之後的缺口
    const fillGapAfterDay = (dayId: number) => {
      const targetDayId = dayId + 1;

      if (!days.value.includes(targetDayId)) {
        days.value.push(targetDayId);
        days.value.sort((a, b) => a - b);
        newlyAddedDayId.value = targetDayId;

        if (nextDayId.value <= targetDayId) {
          nextDayId.value = targetDayId + 1;
        }
      }
    };

    // 取得下一個連續的 Day ID
    const nextSequentialDay = computed(() => {
      if (days.value.length === 0) return 1;
      const maxDay = Math.max(...days.value);
      return maxDay + 1;
    });

    // 新增下一個連續的 Day
    const addNextSequentialDay = () => {
      const nextDay = nextSequentialDay.value;

      if (!days.value.includes(nextDay)) {
        days.value.push(nextDay);
        days.value.sort((a, b) => a - b);
        newlyAddedDayId.value = nextDay;

        if (nextDayId.value <= nextDay) {
          nextDayId.value = nextDay + 1;
        }
      }
    };

    // 檢查是否需要顯示「新增 Day 1」按鈕（使用 computed 確保響應式）
    const shouldShowDay1Button = computed(() => {
      // 只有在「有其他 Day 但缺少 Day 1」時才顯示
      if (days.value.length > 0 && !days.value.includes(1)) {
        return true;
      }

      return false;
    });

    // Combined Save Logic
    const saveTrip = (tripData: Omit<Trip, "id">) => {
      if (editingTrip.value) {
        updateTrip(tripData);
      } else {
        createTrip(tripData);
      }
      closeTripInput(tripData.dayId);
    };

    // Reset Store
    const resetStore = () => {
      showTripInput.value = {};
      editingTrip.value = null;
      savedTrips.value = [];
      nextId.value = 1;
      days.value = [1];
      nextDayId.value = 2;
      startDate.value = new Date();
      newlyAddedDayId.value = null;
      deletingDayId.value = null;
      deletingTripId.value = null;
    };

    return {
      // State
      showTripInput,
      savedTrips,
      editingTrip,
      nextId,
      days,
      nextDayId,
      startDate,
      newlyAddedDayId,
      deletingDayId,
      deletingTripId,
      // UI Control
      openTripInput,
      closeTripInput,
      // CRUD
      createTrip,
      startEditTrip,
      updateTrip,
      startDeleteTrip,
      deleteTrip,
      saveTrip,
      // Day Management
      shouldShowDay1Button,
      restoreDay1,
      fillGapAfterDay,
      addNextSequentialDay,
      startDeleteDay,
      deleteDay,
      getTripsByDay,
      nextSequentialDay,
      hasGapAfterDay,
      // Reset
      resetStore,
    };
  },
  {
    persist: true,
  }
);
