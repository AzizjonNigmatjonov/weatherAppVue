<template>
  <div class="hourly-weather">
    <div class="hourly-weather-wrap" v-for="(time, index) in filteredList" :key="index">
      <HourlyTemp :time="time"></HourlyTemp>
    </div>
  </div>
</template>

<script>
import HourlyTemp from "./HourlyTemp";

export default {
  name: 'HourWeather',
  props: ['forecast'],
  components: {
    HourlyTemp
  },
  computed: {
    filteredList() {
      return this.forecast.hourly.slice(0,23)
    }
  }
}
</script>

<style scoped>
.hourly-weather {
  display: flex;
  max-width: 100vw;
  overflow: scroll;
  padding: 0;
}

.hourly-weather::-webkit-scrollbar {
  display: none;
}
</style>