interface TimeValue {
  hours: number;
  minutes: number;
}

export const formatTime = (time: TimeValue | null): string => {
  if (!time) return "選擇時間";
  const hours = String(time.hours).padStart(2, "0");
  const minutes = String(time.minutes).padStart(2, "0");
  return `${hours}:${minutes}`;
};
