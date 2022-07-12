<script>
export default {
  data() {
    return {
      api_key: process.env.VUE_APP_WEATHER_KEY,
      base_url: 'https://api.openweathermap.org/data/2.5/',
      query: 'Taichung',
      weather: {},
      date: ''
    }
  },
  methods: {
    async fetchWeather() {
      const data = await fetch(`${this.base_url}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
      console.log(await data.json())
    }
  },
  created() {
    this.fetchWeather()
  }
}

</script>