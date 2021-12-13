<template>
  <div class="hourly">
    <span>{{ new Date(this.time.dt * 1000).toLocaleString("en-us", { hour: 'numeric' }) }}</span>
    <span>
      <img :src="require(`../../public/conditions/${this.time.weather[0].icon}.svg`)" alt="">
    </span>
    <span>{{ Math.floor(Math.round((this.time.temp - 32) / 1.8)) }}&deg;</span>
    <span style="font-size: 12px; font-weight: 500">{{ Math.floor(Math.round((this.time.wind_speed))) }} km/h</span>
  </div>
</template>

<script>
export default {
  props: ["time"],
}
</script>

<style scoped>
.hourly {
  background-color: #335e99;
  border-radius: 10px;
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0px;
  margin-right: 20px;
}
span {
  color: #fff;
  font-weight: 500;
}

img {
  width: auto;
  height: 22px;
}
</style>