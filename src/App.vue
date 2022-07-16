<script>
import CurrentWeatherCard from './components/CurrentWeatherCard.vue'
import DailyWeatherCard from './components/DailyWeatherCard.vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-tw'
dayjs.extend(advancedFormat)
dayjs.extend(updateLocale)
dayjs.locale('zh-tw')
dayjs.updateLocale('zh-tw', {
  weekdays: [
    "週日", "週一", "週二", "週三", "週四", "週五", "週六"
  ]
})


export default {
  name: 'app',
  components: {
    CurrentWeatherCard,
    DailyWeatherCard,
  },
  beforeCreate() {
    // beforeCreate
  },
  data() {
    return {
      api_key: '07cc2a6ed664f9d0a145b0b180c530f2',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: 'Taipei',
      locate: [],
      fetchData: {},
      date: []
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
            // Taipei geolocation
            this.locate.push(25.037525);
            this.locate.push(121.563782);
            reject();
          })
      })
    },
    async fetchWeather() {
      await this.getUserLocation();
      const data = await fetch(`${this.base_url}onecall?lat=24.9&lon=131.4&exclude=minutely,hourly&units=metric&lang=zh_tw&appid=${this.api_key}`)
      this.fetchData = await data.json()
      //console.log(await this.fetchData)
    },
    async dayConvert() {
      const current = dayjs()
      this.date.push(dayjs().format('ddd'))
      for (let i = 1; i <= 7; i++) {
        this.date.push(dayjs().add(i, 'day').format('ddd'))
      }
    }
  },
  created() {
    this.fetchWeather()
    this.dayConvert()
  },
  computed: {
    today() {
      return dayjs().format(`ddd MMMM Do YYYY`)
    }
  }
}

</script>

<template>
  <div id="container">
    
    <CurrentWeatherCard :passData='fetchData.current' />
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">{{ date[1] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[0]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[2] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[1]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[3] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[2]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[4] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[3]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[5] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[4]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[6] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[5]' />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ date[7] }}</th>
          <td>
            <DailyWeatherCard :passData='fetchData.daily[6]' />
          </td>
        </tr>
      </tbody>
    </table>
  <!--
    <div>
      {{ fetchData.current }}
    </div>
  -->
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
  width: 387px;
  max-width: 387;
  min-width: 300;
}
</style>
