<template>
  <div class="weekly-forecast">
    <div class="daily" v-for="(day, index) in filteredList" :key="index">
      <DailyForecast :day="day"></DailyForecast>
    </div>
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast";
export default {
  name: 'WeeklyForecast',
  props: ['forecast'],
  components: {DailyForecast},
  created() {
    console.log(this.forecast)
  },
  computed: {
    filteredList() {
      return this.forecast.daily.slice(1,8);
    }
  }
}
</script>

<style scoped>
.weekly-forecast {
  display: flex;
  max-width: 100vw;
  overflow: scroll;
  padding: 0;
}
.weekly-forecast::-webkit-scrollbar {
  display: none;
}
</style>