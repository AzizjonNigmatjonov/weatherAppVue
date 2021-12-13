<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather" :class="{day: isDay, nigth: isNight}">
      <div class="weather-wrap">
        <CurrentWeather :isDay="isDay" :isNight="isNight" :currentWeather="currentWeather" :currentTime="currentTime" :forecast="forecast"></CurrentWeather>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from '../firebase/firebaseinit'
import CurrentWeather from "../components/CurrentWeather";

export default {
  props: ["APIkey", "isDay", "isNight"],
  components: {
    CurrentWeather,
  },
  data() {
    return {
      currentTime: null,
      forecast: null,
      currentWeather: null,
      loading: true,
    }
  },
  created() {
    this.getWeather()
  },
  beforeDestroy() {
    this.$emit('restDays')
  },
  methods: {
    getWeather() {
      db.collection('cities')
          .where("city", "==", this.$route.params.city)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              this.currentWeather = doc.data().currentWeather;
              axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutley,alerts&units=imperial&appid=${this.APIkey}`)
                  .then(res => {
                    this.forecast = res.data;
                  }).then(() => {
                this.loading = false;
                this.getCurrentTime();
              })
            })
          })
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit('is-day')
      } else {
        this.$emit('is-night')
      }
    }
  }
}
</script>

<style scoped>
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  height: 100%;
}

.weather .weather-wrap {
  overflow: hidden;
  margin: 0 auto;
}
</style>