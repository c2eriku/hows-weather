<script>
import CurrentWeatherCard from './components/CurrentWeatherCard.vue'
import DailyWeatherCard from './components/DailyWeatherCard.vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

export default {
  name: 'app',
  components: {
    CurrentWeatherCard,
    DailyWeatherCard
  },
  data() {
    return {
      api_key: '07cc2a6ed664f9d0a145b0b180c530f2',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: 'Taipei',
      fetchData: {},
      date: ''
    }
  },
  methods: {
    async fetchWeather() {
      const data = await fetch(`${this.base_url}onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=${this.api_key}`)

      this.fetchData = await data.json()
      console.log(await this.fetchData)
    }
  },
  created() {
    this.fetchWeather()
  },
  computed: {
        today() {
            return dayjs().format(`MMMM Do YYYY`)
        },
        dayplus(d){
            return dayjs().add(d, 'day').format(`MMMM Do YYYY`)
        }
    },
}

</script>

<template>
  <div id="container">
    <div>
      {{fetchData.current}}
    </div>
{{today}}
    Today<CurrentWeatherCard :passData='fetchData.current'/>
    +1<DailyWeatherCard :passData='fetchData.daily[0]'/>
    +2<DailyWeatherCard :passData='fetchData.daily[1]'/>
    +3<DailyWeatherCard :passData='fetchData.daily[2]'/>
    +4<DailyWeatherCard :passData='fetchData.daily[3]'/>
    +5<DailyWeatherCard :passData='fetchData.daily[4]'/>
    +6<DailyWeatherCard :passData='fetchData.daily[5]'/>
    +7<DailyWeatherCard :passData='fetchData.daily[6]'/>


    
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

#container{
  align-items: center;
  width:387px;
  max-width: 387;
  min-width: 300;
}
    
</style>
