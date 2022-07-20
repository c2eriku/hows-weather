<script>
import dayjs from 'dayjs'

export default {
    props: ['passData'],
    data() {
        return {
            url: {},
            // avalibale animate
            show: false
        }
    },
    methods: {
        pickIcon() {
            // get openweathermap.org weather icon
            this.url = `http://openweathermap.org/img/wn/${this.passData.weather[0].icon}@4x.png`
        }
    },
    computed: {
        lastUpdate() {
            return dayjs.unix(`${this.passData.dt}`).format('HH:mm:ss')
        }
    },
    created() {
        this.pickIcon()
    },
    mounted() {
        this.show = true;
    }
}
</script>

<template>
    <Transition name="bounce">
        <div class="currentWeather__card" v-if="show">
            <div class="card__header">
                <img :src='url' :alt='url' class="card__image">
            </div>
            <div class="card__body">
                <p>{{ passData.weather[0].description }}</p>
                <p>{{ passData.temp.toFixed(1) }}°</p>
                <p>體感溫度：{{ passData.feels_like.toFixed(1) }}°</p>
                <p>濕度：{{ passData.humidity }}</p>
                <p>最後更新：{{ lastUpdate }}</p>
            </div>
        </div>
    </Transition>
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>