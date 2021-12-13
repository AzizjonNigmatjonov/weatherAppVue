<template>
  <div>
    <div v-if="navbarActive" class="navbar" uk-sticky>
      <h3 @click="addCity" style="color: #fff; cursor:pointer; display: flex; margin: 0">
        Add City
        <i class="fa fa-plus" style="font-size: 18px; margin-left: 8px; display: flex; align-items: center; margin-top: 5px"></i>
      </h3>
      <div class="nav-icons">
        <i @click="editCities" ref="editCities" class="fa fa-edit"></i>
        <i @click="refresh" class="fa fa-sync"></i>
      </div>
    </div>
    <div v-else class="navbar" :class="{ day: isDay, nigth: isNight }" style="color: #fff !important; font-weight: 600">
      <i @click="back" style="color: #fff !important; font-size: 20px; cursor:pointer;" class="fa fa-long-arrow-left"></i>
      {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
      {{ new Date().toLocaleString("en-us", { month: "short" }) }}
      {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
      <span>&deg; C</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['navbarActive', 'isDay', 'isNight'],
  methods: {
    addCity() {
      this.$emit('add-city')
    },
    refresh() {
      location.reload();
    },
    editCities() {
      this.$refs.editCities.classList.toggle('edit-active');
      this.$emit('edit-city');
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.nav-icons i {
  font-size: 20px;
  color: #fff;
  margin-left: 16px;
  cursor: pointer;
}
.edit-active {
  color: crimson !important;
}
</style>