<script>
import CurrentWeatherCard from './components/CurrentWeatherCard.vue'
import DailyWeatherCard from './components/DailyWeatherCard.vue'
// vue-loading-overlay
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// dayjs
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/ja'
dayjs.extend(advancedFormat)
dayjs.extend(updateLocale)
dayjs.locale('zh-tw')

export default {
  name: 'app',
  components: {
    CurrentWeatherCard,
    DailyWeatherCard,
    Loading
  },
  data() {
    return {
      api_key: '07cc2a6ed664f9d0a145b0b180c530f2',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: 'Taipei',
      locate: [],
      fetchData: null,
      date: [],
      // vue-loading-overlay
      isLoading: true,
      fullPage: true,
      locale: 'zh-tw'
    }
  },
  methods: {
    getUserLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          success => {
            this.locate.push(success.coords.latitude);
            this.locate.push(success.coords.longitude);
            resolve();
          },
          error => {
            console.log(error.message);
            // push Taipei geolocation
            this.locate.push(25.037525);
            this.locate.push(121.563782);
            reject();
          })
      })
    },
    async fetchWeather() {
      await this.getUserLocation();
      const data = await fetch(`${this.base_url}onecall?lat=${this.locate[0]}&lon=${this.locate[1]}&exclude=minutely,hourly&units=metric&lang=zh_tw&appid=${this.api_key}`)
      this.fetchData = await data.json()
      this.isLoading = false;
      /* show loading overlay *
      setTimeout(() => {
        console.log('Testing loading overlay vue.')
        this.isLoading = true;
      }, 5000)
      /**/
    },
    setLocale(locale) {
      dayjs.locale(locale)
      this.fetchWeather()
    }
  },
  created() {
    this.fetchWeather()
  }
}
</script>

<template>
  <div id="container">
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="fullPage" :loader="'dots'" />

    Selected Language:
    <select v-model="locale" @change="setLocale(locale)">
      <option>zh-tw</option>
      <option>en</option>
      <option>ja</option>
    </select>

    <CurrentWeatherCard :passData='fetchData.current' />
    <DailyWeatherCard :passData='fetchData.daily[1]' />
    <DailyWeatherCard :passData='fetchData.daily[2]' />
    <DailyWeatherCard :passData='fetchData.daily[3]' />
    <DailyWeatherCard :passData='fetchData.daily[4]' />
    <DailyWeatherCard :passData='fetchData.daily[5]' />
    <DailyWeatherCard :passData='fetchData.daily[6]' />
    <DailyWeatherCard :passData='fetchData.daily[7]' />

  </div>
</template>


<style>
body {
  font-family: "Quicksand", sans-serif;
  display: grid;
  place-items: center;
  align-items: center;
  height: 100vh;
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

tr {
  text-align: center;
  vertical-align: middle
}

#container {
  align-items: center;
  padding: 5px;
  width: 387px;
  max-width: 387;
  min-width: 300;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
