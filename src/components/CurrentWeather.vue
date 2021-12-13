<template>
  <div class="current-weather">
    <div class="container">
      <div class="weather-info uk-position-relative">
        <img v-if="isDay" src="../../public/sun.jpg" alt="sun">
        <img v-if="isNight" src="../../public/moon.jpg" alt="moon">
        <div class="city uk-child-width-1-1" uk-grid>
         <div uk-grid>
           <div>
             <div class="uk-child-width-1-1 uk-grid-small" uk-grid>
               <div class="city-name">
                 <p>{{ this.currentWeather.name }}</p>
                 <span>
                   {{ new Date(this.currentWeather.dt * 1000).toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' }) }}
            </span>
               </div>
               <div class="celsius uk-grid-small uk-flex-middle" uk-grid>
                 <span>{{ Math.floor(Math.round((this.currentWeather.main.temp - 32) / 1.8)) }}&deg;</span>
                 <div class="feel-like">
                   <p style="font-size: 18px; font-weight: 500">{{ this.currentWeather.weather[0].description }}</p>
                   <p style="color: #ffffffcd">Feels like
                     {{ Math.floor(Math.round((this.currentWeather.main.feels_like - 32) / 1.8)) }}&deg;</p>
                 </div>
               </div>
               <div class="max-min-temp">
                 <p>The high will be: {{
                     Math.floor(Math.round((this.currentWeather.main.temp_max - 32) / 1.8))
                   }}&deg;</p>
                 <p>The low will be: {{
                     Math.floor(Math.round((this.currentWeather.main.temp_min - 32) / 1.8))
                   }}&deg;</p>
               </div>
             </div>
           </div>
           <div class="other-infos uk-grid-middle uk-margin-large-top" uk-grid>
             <div>
               <div class="uk-text-uppercase uk-grid-small uk-child-width-1-1 uk-flex uk-flex-column"
                    style="color: #fff">
                 <p style="margin: 0; text-transform: uppercase">Humidity</p>
                 <p style="margin: 0">{{ this.currentWeather.main.humidity }}%</p>
               </div>
             </div>
             <div>
               <div class="uk-grid-small uk-child-width-1-1 uk-flex uk-flex-column"
                    style="color: #fff">
                 <p style="margin: 0; text-transform: uppercase">WIND</p>
                 <p style="margin: 0">{{ Math.round(this.currentWeather.wind.speed * 1.6) }} km</p>
               </div>
             </div>
             <div>
               <div class="uk-grid-small uk-child-width-1-1 uk-flex uk-flex-column"
                    style="color: #fff">
                 <p style="margin: 0; text-transform: uppercase">Presure</p>
                 <p style="margin: 0">{{ this.currentWeather.main.pressure }} mb</p>
               </div>
             </div>
             <div>
               <div class="uk-grid-small uk-child-width-1-1 uk-flex uk-flex-column"
                    style="color: #fff">
                 <p style="margin: 0; text-transform: uppercase">Cloudness</p>
                 <p style="margin: 0">{{ this.currentWeather.clouds.all }}%</p>
               </div>
             </div>
           </div>
           <div uk-grid>
             <div class="uk-flex uk-flex-column">
               <p style="margin: 0; color: #fff; text-transform: uppercase; font-size: 12px; font-weight: 500">Sunrise</p>
               <p style="margin: 0; color: #fff; font-weight: 500">{{ new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString("en-us", { timeStyle: "short" }) }}</p>
             </div>
             <div class="uk-flex uk-flex-column">
               <p style="margin: 0; color: #fff; text-transform: uppercase; font-size: 12px; font-weight: 500">Sunset</p>
               <p style="margin: 0; color: #fff; font-weight: 500">{{ new Date(this.currentWeather.sys.sunset * 1000).toLocaleString("en-us", { timeStyle: "short" }) }}</p>
             </div>
           </div>
         </div>
          <div>
            <HourlyWeather :forecast="forecast"></HourlyWeather>
          </div>
          <div>
            <WeeklyForecast :forecast="forecast"></WeeklyForecast>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HourlyWeather from "../components/HourlyWeather";
import WeeklyForecast from "../components/WeeklyForecast";

export default {
  props: ["isDay", "isNight", "currentWeather", "currentTime", "forecast"],
  components: {
    HourlyWeather,
    WeeklyForecast
  },
  data() {
    return {
      time: null,
      val: null
    }
  },
  created() {
    this.getCurrentHour();
    console.log(this.currentWeather)
  },
  methods: {
    getCurrentHour() {
      const today = new Date();
      const hour = today.getHours();
      const minutes = today.getMinutes();
      const todayTime = `${hour + ':' + minutes}`
      const value = hour >= 12 ? "PM" : "AM";
      this.time = todayTime
      this.val = value
    }
  }
}
</script>

<style scoped>
.current-weather {

}

.city {
  position: absolute;
  top: 40px;
  left: 70px;
}

@media (max-width: 500px) {
  .city {
    top: 30px;
    left: 20px;
  }
}

.feel-like {
  display: flex;
  flex-direction: column;
}

.feel-like p {
  margin: 0;
}

.celsius span {
  font-size: 56px;
  color: #fff;
  font-weight: 500;
}

.celsius p {
  color: #fff;
}

.city-name p {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
}

.city-name span {
  color: #ffffffcd;
  font-weight: 400;
  font-size: 14px;
}

.max-min-temp {
  margin-top: 5px;
}

.max-min-temp p {
  margin: 0;
  color: #fff;
  margin-top: 5px;
}
</style>