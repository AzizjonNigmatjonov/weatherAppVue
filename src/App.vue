<template>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <span></span>
    </div>
    <div v-else class="app">
      <Modal @close-modal="toggleModal" v-if="openModal" :APIkey="APIkey" :cities="cities"></Modal>
      <Navigation
          @add-city="toggleModal"
          @edit-city="toggleEdit"
          :navbarActive="navbarActive"
          :isDay="isDay"
          :isNight="isNight"
      ></Navigation>
      <router-view
          :isDay="isDay"
          :isNight="isNight"
          :cities="cities"
          v-bind:edit="edit"
          :APIkey="APIkey"
          @is-day="dayTime"
          @is-night="nightTime"
          @restDays="restDays"
          @add-city="toggleModal"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import db from '../src/firebase/firebaseinit.js'
import './sass/main.css';
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";

export default {
  name: 'Home',
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      isDay: false,
      isNight: false,
      APIkey: '1034e208e2d533a3fdf326da6c95328d',
      cities: [],
      openModal: false,
      edit: false,
      navbarActive: true,
      isLoading: true,
    }
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection('cities')
      firebaseDB.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.isLoading = false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&APPID=${this.APIkey}`)
              const data = response.data;
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data
              })
                  .then(() => {
                    this.cities.push(doc.doc.data());
                    this.isLoading = false;
                  })
            } catch (err) {
              console.log(err)
            }
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter((city) => city.city !== doc.doc.data().city);
          }
        })
      })
    },
    toggleModal() {
      this.openModal = !this.openModal
    },
    toggleEdit() {
      this.edit = !this.edit
    },
    checkRoute() {
      if (this.$route.name == "AddCity") {
        this.navbarActive = true;
      } else {
        this.navbarActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    restDays() {
      this.isDay = false;
      this.isNight = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}
</script>

<style>
.day {
  transition: 500ms ease all;
  background-color: #225090 !important;
}

.nigth {
  transition: 500ms ease all;
  background-color: #121212 !important;
}

.loading {
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}

.loading span {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 2px solid transparent;
  border-top-color: #142a5f;
  border-radius: 50%;
  animation: spin ease 1000ms infinite;
}
</style>
