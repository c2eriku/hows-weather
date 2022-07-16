<script>
import dayjs from 'dayjs'

export default {
    props: ['passData'],
    data() {
        return {
            url: {}
        }
    },
    methods: {
        pickIcon() {
            this.url = `http://openweathermap.org/img/wn/${this.passData.weather[0].icon}@4x.png`
            //console.log(this.url)
        }
    },
    computed: {
        lastUpdate() {
            return dayjs.unix(`${this.passData.dt}`).format('HH:mm:ss')
        }
    },
    created() {
        this.pickIcon()
    }
}
</script>

<template>
    <div class="currentWeather__card">
        <div class="card__header">
            <img :src='url' :alt='url' class="card__image">
        </div>
        <div class="card__body">
            <h3>{{today}}</h3>
            <p>{{ passData.weather[0].description }}</p>
            <p>{{ passData.temp.toFixed(1) }}°</p>
            <p>體感溫度：{{ passData.feels_like.toFixed(1) }}°</p>
            <p>濕度：{{ passData.humidity }}</p>
            <p>最後更新：{{lastUpdate}}</p>
        </div>
    </div>
</template>



<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

img {
    max-width: 100%;
    display: block;
    object-fit: cover;
}

.currentWeather__card {
    display: flex;
    margin-top: 10px;
    width: 387px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #ECE9E6;
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);

}

.card__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.card__body h4 {
    font-size: 1.5rem;
    text-transform: capitalize;
}
</style>