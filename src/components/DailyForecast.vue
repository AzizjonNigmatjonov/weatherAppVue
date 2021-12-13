<template>
  <div class="daily-forecast">
    <div>
      <div class="day">
        <span>{{ new Date(this.day.dt * 1000).toLocaleString("en-us", { weekday: 'short' }) }}</span>
        <span>{{ new Date(this.day.dt * 1000).toLocaleString("en-us", { day: '2-digit' }) }}</span>
      </div>
      <div class="temp uk-flex-middle uk-margin-small-top" uk-grid>
        <div>
          <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" alt="">
        </div>
       <div>
         <div>
           <span class="high">{{ Math.floor(Math.round((this.day.temp.max - 32) / 1.8)) }}&deg;</span>
           <span class="low">{{ Math.floor(Math.round((this.day.temp.min - 32) / 1.8)) }}&deg;</span>
         </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyForecast',
  props: ['day'],
}
</script>

<style scoped>

.daily-forecast {
  background-color: #335e99;
  border-radius: 10px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0px;
  margin-right: 20px;
}

.day {
  display: flex;
  gap: 5px;
  background-color: transparent !important;
  color: #fff !important;
}
img {
  width: auto;
  height: 32px;
}

.temp span {
  color: #fff;
  display: block;
}
.temp span:nth-child(1) {
  font-weight: 500;
  margin-bottom: 5px;
}
</style>