<template>
  <div @click="goToWeather" class="uk-position-relative">
    <i @click="removeCity" v-if="edit" ref="edit" class="fa fa-trash-alt edit"></i>
    <div class="video">
      <video loop autoplay muted
             :src="require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)"></video>
    </div>
    <div class="weather">
      <p style="text-transform: capitalize">{{ this.city.city }}</p>
      <div class=" uk-grid-small uk-flex-midle" uk-grid>
        <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)">
        <span class="uk-flex uk-flex-middle">{{
            Math.floor(Math.round((this.city.currentWeather.main.temp - 32) / 1.8))
          }}&deg;</span>
      </div>
    </div>
    <div class="description" style="position: absolute; top: 50%; right: 30px; transform: translateY(-50%)">
      <p style="font-size: 18px; color: #fff">{{ this.city.currentWeather.weather[0].description }}</p>
    </div>
    <div class="bg-overlay"></div>
  </div>
</template>

<script>
import db from '../firebase/firebaseinit'

export default {
  name: 'City',
  props: ['city', 'edit'],
  data() {
    return {
      id: null,
    }
  },
  methods: {
    removeCity() {
      db.collection('cities')
          .where('city', '==', `${this.city.city}`)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              this.id = doc.id
            })
          })
          .then(() => {
            db.collection('cities').doc(this.id).delete();
          })
    },
    goToWeather(e) {
      if (e.target == this.$refs.edit) {
        //
      } else {
        this.$router.push({name: "Weather", params: {city: this.city.city}})
      }
    }
  }
}
</script>

<style scoped>
.weather {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  z-index: 2 !important;
}
.edit {
  border-radius: 15px 0px 0px 0px;
  border: 10px solid #364e70;
  background-color: #364e70;
  z-index: 1;
  font-size: 20px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
  color: #fff !important;
}
.description {
  z-index: 2 !important;
}
.weather img {
  height: 70px;
  width: auto;
}
.weather p {
  margin-bottom: 30px;
  font-size: 28px;
  color: #ffffffdd;
  font-weight: 600;
}
.weather span {
  font-size: 36px;
  color: #fff;
  font-weight: 600;
}
.bg-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>