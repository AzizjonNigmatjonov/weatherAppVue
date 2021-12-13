<template>
  <div class="add-city">
    <div v-if="cities.length === 0" class="no-cities">
      <p>No cities, add one?</p>
      <button @click="addCity">Add City</button>
    </div>
    <div v-else v-for="(city, index) in cities" :key="index" class="uk-width-1-1">
      <City :city="city" v-bind:edit="edit"></City>
    </div>
  </div>
</template>

<script>
import City from '../components/City.vue'
export default {
  name: 'AddCity',
  props: ['cities', 'edit'],
  methods: {
    addCity() {
      this.$emit('add-city')
    },
  },
  components: {
    City
  }
}
</script>

<style scoped>
.add-city {
  background-color: #235292;
  min-height: 100vh;
  display: flex;
}
.no-cities {
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
button {
  padding: 12px 24px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 500;
}
button:focus {
  outline: none;
}
button:hover {
  outline: none;
  transform: scale(0.98);
}
.no-cities p {
  color: #fff;
  font-weight: 500;
  font-size: 24px;
}
</style>
