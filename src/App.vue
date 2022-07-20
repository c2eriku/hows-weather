<script>
import HowsWeather from './HowsWeather.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': HowsWeather,
  '/NotFound': NotFound
}

export default {
  data() {
    return {
      currentPath: window.location.hash,
      isOnline: navigator.onLine,
    }
  },
  computed: {
    currentView() {
      if (!navigator.onLine) return NotFound
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <!-- router example template-->
  <a href="#/">Home</a> | 
  <a href="#/NotFound">Route to NotFound page</a> | 
  <input type="checkbox" v-model="isOnline" disabled/> isOnline
  <component :is="currentView" />
</template>