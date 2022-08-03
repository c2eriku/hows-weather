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
  watch: {
    isOnline: function(){
      if (!navigator.onLine) return NotFound
      else return routes[this.currentPath.slice(1) || '/'] 
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
  <component :is="currentView" />
  
</template>