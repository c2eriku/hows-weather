<script>
import Home from './Home.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/NotFound': NotFound
}

export default {
  data() {
    return {
      currentPath: window.location.hash,
    }
  },
  computed: {
    currentView() {
      if(!navigator.onLine) return NotFound
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
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/OFFLINEPAGE">Disconnect Test Page</a>
  <component :is="currentView" />
</template>