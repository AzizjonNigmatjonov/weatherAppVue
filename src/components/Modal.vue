<template>
  <div @click="closeModal" ref="modal" class="modal">
    <div class="modal-wrap">
      <label for="city-name">Enter Any City:</label>
      <input v-model="city" type="text" name="city-name" placeholder="Search for city name...">
      <button style="font-weight: 600" @click="addCity">Add City</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from '../firebase/firebaseinit'

export default {
  props: ['APIkey','cities'],
  data() {
    return {
      city: '',
    }
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("close-modal");
      }
    },
    async addCity() {
      if (this.city === "") {
        alert('Fill feild')
      } else if (this.cities.some((res) => res.city === this.city.toLowerCase())) {
        alert(`${this.city} is existed`);
        this.city = '';
      } else {
        try {
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.APIkey}`);
          const data = await res.data;
          db.collection('cities').doc().set({
            city: this.city.toLowerCase(),
            currentWeather: data
          }).then(() => {
            this.$emit("close-modal");
          })
        }
        catch {
          alert(`${this.city} doesn't exist, please try gain!`)
        }
      }
    }
  }
}
</script>

<style scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal label {
  color: #fff;
}
.modal-wrap {
  max-width: 500px;
  border-radius: 8px;
  width: 80%;
  padding: 20px;
  background-color: #333;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.modal-wrap input {
  color: #fff;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  padding: 6px 4px;
  margin: 10px 0 20px;
  width: 100%;
  font-size: 18px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.modal-wrap input:focus {
  outline: none;
}
.modal button {
  background-color: #fff;
  color: #111;
  font-weight: 500 !important;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}
</style>